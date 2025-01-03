# Implementation Details

## Type Definitions

### Authentication Types
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

### Habit Types
```typescript
interface Habit {
  id: number;
  user_id: number;
  name: string;
  target?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface HabitFormData {
  name: string;
  target?: string;
  notes?: string;
}

interface HabitsState {
  habits: Habit[];
  currentHabit: Habit | null;
  loading: boolean;
  error: string | null;
}
```

### Log Types
```typescript
interface HabitLog {
  id: number;
  habit_id: number;
  date: string;
  done: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface LogFormData {
  date: string;
  done: boolean;
  notes?: string;
}

interface LogsState {
  logs: Record<number, HabitLog[]>;
  loading: boolean;
  error: string | null;
}
```

## Store Implementations

### Auth Store
```typescript
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async login(credentials: LoginCredentials),
    async register(data: RegisterData),
    async logout(),
    async checkAuth(),
  },
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  }
});
```

### Habits Store
```typescript
export const useHabitsStore = defineStore('habits', {
  state: (): HabitsState => ({
    habits: [],
    currentHabit: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchHabits(),
    async createHabit(data: HabitFormData),
    async updateHabit(id: number, data: HabitFormData),
    async deleteHabit(id: number),
  },
  
  getters: {
    sortedHabits: (state) => [...state.habits].sort((a, b) => a.name.localeCompare(b.name)),
    getHabitById: (state) => (id: number) => state.habits.find(h => h.id === id),
  }
});
```

### Logs Store
```typescript
export const useLogsStore = defineStore('logs', {
  state: (): LogsState => ({
    logs: {},
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchLogs(habitId: number),
    async updateLog(habitId: number, logId: number, data: LogFormData),
    async bulkUpdateLogs(habitId: number, dates: string[], done: boolean),
  },
  
  getters: {
    getLogsByHabit: (state) => (habitId: number) => state.logs[habitId] || [],
    getLogByDate: (state) => (habitId: number, date: string) => 
      state.logs[habitId]?.find(log => log.date === date),
  }
});
```

## Component Hierarchy

### Atomic Components
```
atoms/
  ├── BaseButton.vue
  ├── BaseInput.vue
  ├── BaseCheckbox.vue
  ├── BaseIcon.vue
  └── BaseCalendarDay.vue

molecules/
  ├── HabitCard.vue
  ├── LogEntry.vue
  ├── AuthForm.vue
  ├── HabitForm.vue
  └── CalendarWeek.vue

organisms/
  ├── HabitList.vue
  ├── LogCalendar.vue
  ├── StatsPanel.vue
  └── NavigationBar.vue
```

## Route Structure
```typescript
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'habits/:id',
        name: 'habit-detail',
        component: HabitDetailPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsPage,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginPage
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterPage
      }
    ]
  }
];
```

## API Service Structure
```typescript
class ApiService {
  private axios: AxiosInstance;
  
  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    this.axios.interceptors.request.use(
      this.authInterceptor,
      this.errorInterceptor
    );
  }
}

class AuthService extends ApiService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  logout(): Promise<void>;
}

class HabitsService extends ApiService {
  getHabits(): Promise<Habit[]>;
  createHabit(data: HabitFormData): Promise<Habit>;
  updateHabit(id: number, data: HabitFormData): Promise<Habit>;
  deleteHabit(id: number): Promise<void>;
}

class LogsService extends ApiService {
  getLogs(habitId: number): Promise<HabitLog[]>;
  updateLog(habitId: number, logId: number, data: LogFormData): Promise<HabitLog>;
}
```

## Composables
```typescript
// useAuth.ts
export function useAuth() {
  const store = useAuthStore();
  const router = useRouter();
  
  const login = async (credentials: LoginCredentials) => {
    await store.login(credentials);
    router.push({ name: 'dashboard' });
  };
  
  return {
    login,
    register: store.register,
    logout: store.logout,
    user: computed(() => store.currentUser),
    isAuthenticated: computed(() => store.isAuthenticated),
  };
}

// useHabit.ts
export function useHabit(habitId?: number) {
  const store = useHabitsStore();
  const habit = computed(() => habitId ? store.getHabitById(habitId) : null);
  
  return {
    habit,
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    createHabit: store.createHabit,
    updateHabit: store.updateHabit,
    deleteHabit: store.deleteHabit,
  };
}

// useHabitLogs.ts
export function useHabitLogs(habitId: number) {
  const store = useLogsStore();
  const logs = computed(() => store.getLogsByHabit(habitId));
  
  return {
    logs,
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    updateLog: (logId: number, data: LogFormData) => 
      store.updateLog(habitId, logId, data),
    bulkUpdate: (dates: string[], done: boolean) =>
      store.bulkUpdateLogs(habitId, dates, done),
  };
}
```
