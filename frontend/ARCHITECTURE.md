# Architecture Documentation

## High-Level Architecture

```mermaid
graph TD
    subgraph Frontend
        UI[UI Components]
        Router[Vue Router]
        Store[Pinia Store]
        API[API Service]
    end

    subgraph Backend
        Auth[Auth Service]
        Habits[Habits Service]
        Logs[Logs Service]
        DB[(Database)]
    end

    UI --> Router
    UI --> Store
    Store --> API
    API --> Auth
    API --> Habits
    API --> Logs
    Auth --> DB
    Habits --> DB
    Logs --> DB
```

## Component Architecture

```mermaid
graph TD
    subgraph Pages
        Login
        Register
        Dashboard
        HabitDetail
        Settings
    end

    subgraph Components
        subgraph Atoms
            Button
            Input
            Checkbox
            Calendar
        end

        subgraph Molecules
            HabitCard
            LogEntry
            AuthForm
            HabitForm
        end

        subgraph Organisms
            HabitList
            LogCalendar
            StatsPanel
            NavBar
        end
    end

    Dashboard --> HabitList
    Dashboard --> StatsPanel
    HabitDetail --> LogCalendar
    HabitList --> HabitCard
    LogCalendar --> LogEntry
    AuthForm --> Input
    AuthForm --> Button
    HabitCard --> Button
    LogEntry --> Checkbox
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant S as Store
    participant A as API
    participant B as Backend

    U->>C: Interact
    C->>S: Dispatch Action
    S->>A: API Request
    A->>B: HTTP Request
    B-->>A: Response
    A-->>S: Update State
    S-->>C: React to Change
    C-->>U: Update UI
```

## Directory Structure
```
frontend/
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   └── images/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── composables/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── services/
│   │   ├── api/
│   │   └── auth/
│   ├── stores/
│   ├── types/
│   └── utils/
├── public/
├── tests/
│   ├── unit/
│   └── e2e/
└── dist/
```

## State Management

```mermaid
graph TD
    subgraph Pinia Stores
        Auth[Auth Store]
        Habits[Habits Store]
        UI[UI Store]
    end

    subgraph State
        AuthState[User, Token]
        HabitsState[Habits, Logs]
        UIState[Theme, Loading]
    end

    Auth --> AuthState
    Habits --> HabitsState
    UI --> UIState
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database

    U->>F: Login Request
    F->>B: POST /auth/login
    B->>D: Validate Credentials
    D-->>B: User Data
    B-->>F: JWT Token
    F->>F: Store Token
    F-->>U: Redirect to Dashboard
```

## API Integration

```mermaid
graph LR
    subgraph Frontend Services
        AuthService
        HabitService
        LogService
    end

    subgraph API Client
        Axios
    end

    subgraph Interceptors
        Auth[Auth Interceptor]
        Error[Error Interceptor]
    end

    AuthService --> Axios
    HabitService --> Axios
    LogService --> Axios
    Axios --> Auth
    Axios --> Error
```

## Responsive Design Strategy

```mermaid
graph TD
    subgraph Breakpoints
        SM[sm: 640px]
        MD[md: 768px]
        LG[lg: 1024px]
        XL[xl: 1280px]
        XXL[2xl: 1536px]
    end

    subgraph Layouts
        Mobile[Stack Layout]
        Tablet[Split Layout]
        Desktop[Dashboard Layout]
    end

    SM --> Mobile
    MD --> Tablet
    LG --> Desktop
```
