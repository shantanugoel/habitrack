use habit_tracker::app::App;
use loco_rs::testing;
use serde_json::json;
use serial_test::serial;

#[tokio::test]
#[serial]
async fn can_get_habits() {
    testing::request::<App, _, _>(|request, _ctx| async move {
        let res = request.get("/api/habits/").await;
        assert_eq!(res.status_code(), 200);

        // you can assert content like this:
        // assert_eq!(res.text(), "content");
    })
    .await;
}

mod test_helpers {
    use habit_tracker::models::users::{self, Model as UserModel};
    use loco_rs::app::AppContext;
    use serde_json::json;

    pub struct TestUser {
        pub user: UserModel,
        pub token: String,
    }

    pub async fn create_test_user(request: &loco_rs::TestServer, ctx: &AppContext) -> TestUser {
        let email = "test@loco.com";
        let password = "12341234";
        let register_payload = serde_json::json!({
            "name": "loco",
            "email": email,
            "password": password
        });

        //Creating a new user
        let _ = request
            .post("/api/auth/register")
            .json(&register_payload)
            .await;

        let user = users::Model::find_by_email(&ctx.db, email).await.unwrap();
        let verify_payload = serde_json::json!({
            "token": user.email_verification_token,
        });
        request.post("/api/auth/verify").json(&verify_payload).await;

        //verify user request
        let response = request
            .post("/api/auth/login")
            .json(&serde_json::json!({
                "email": email,
                "password": password
            }))
            .await;

        // Make sure email_verified_at is set
        assert!(users::Model::find_by_email(&ctx.db, email)
            .await
            .unwrap()
            .email_verified_at
            .is_some());
        let user = users::Model::find_by_email(&ctx.db, email).await.unwrap();
        TestUser {
            user,
            token: serde_json::from_str::<serde_json::Value>(response.text().as_str()).unwrap()
                ["token"]
                .as_str()
                .unwrap()
                .to_string(),
        }
    }

    pub async fn create_dummy_habits(
        request: &loco_rs::TestServer,
        test_user: &TestUser,
        count: i32,
    ) {
        for i in 1..=count {
            let response = request
                .post("/api/habits")
                .add_header("Authorization", format!("Bearer {}", test_user.token))
                .json(&json!({
                    "name": format!("Test Habit {}", i),
                    "target": format!("Target {}", i),
                    "notes": format!("Notes for habit {}", i)
                }))
                .await;
            assert_eq!(response.status_code(), 200);
        }
    }
}

#[tokio::test]
#[serial]
async fn can_create_and_get_habits() {
    testing::request::<App, _, _>(|request, ctx| async move {
        // Create test user using helper
        let test_user = test_helpers::create_test_user(&request, &ctx).await;

        // Add a new habit
        let add_response = request
            .post("/api/habits")
            .authorization_bearer(&test_user.token)
            .json(&json!({
                "name": "Daily Exercise",
                "target": "30 minutes",
                "notes": "Morning workout routine"
            }))
            .await;
        assert_eq!(add_response.status_code(), 200);

        // Get all habits
        let list_response = request
            .get("/api/habits")
            .authorization_bearer(&test_user.token)
            .await;
        assert_eq!(list_response.status_code(), 200);

        // Verify response contains our habit
        let habits: Vec<serde_json::Value> = list_response.json();
        assert_eq!(habits.len(), 1);
        assert_eq!(habits[0]["name"], "Daily Exercise");
        assert_eq!(habits[0]["target"], "30 minutes");
        assert_eq!(habits[0]["notes"], "Morning workout routine");
        // assert_eq!(habits[0]["user_id"], test_user.user.id);
    })
    .await;
}

#[tokio::test]
#[serial]
async fn can_list_multiple_habits() {
    testing::request::<App, _, _>(|request, ctx| async move {
        // Create test user and dummy habits
        let test_user = test_helpers::create_test_user(&request, &ctx).await;
        test_helpers::create_dummy_habits(&request, &test_user, 3).await;

        // Get all habits
        let list_response = request
            .get("/api/habits")
            .authorization_bearer(&test_user.token)
            .await;
        assert_eq!(list_response.status_code(), 200);

        // Verify we have all our dummy habits
        let habits: Vec<serde_json::Value> = list_response.json();
        assert_eq!(habits.len(), 3);

        // Verify the content of each habit
        for i in 0..3 {
            assert_eq!(habits[i]["name"], format!("Test Habit {}", i + 1));
            assert_eq!(habits[i]["target"], format!("Target {}", i + 1));
            assert_eq!(habits[i]["notes"], format!("Notes for habit {}", i + 1));
            assert_eq!(habits[i]["user_id"], test_user.user.id);
        }
    })
    .await;
}
