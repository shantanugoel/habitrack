use habit_tracker::app::App;
use loco_rs::testing;
use serial_test::serial;

#[tokio::test]
#[serial]
async fn can_get_hlogs() {
    testing::request::<App, _, _>(|request, _ctx| async move {
        let res = request.get("/api/hlogs/").await;
        assert_eq!(res.status_code(), 200);

        // you can assert content like this:
        // assert_eq!(res.text(), "content");
    })
    .await;
}