# Habit Tracker

A modern habit tracking application built with Vue 3, TypeScript, and Tailwind CSS. Track your daily habits, monitor progress, and build better routines.

## Features

- **User Authentication**: Secure login and registration system
- **Habit Management**: Create, update, and delete habits
- **Daily Tracking**: Log your habit completion daily
- **Dashboard**: Overview of your habits and progress
- **Dark Mode**: Built-in theme support for light and dark modes
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Type Safety**: TypeScript
- **State Management**: Pinia
- **Styling**: Tailwind CSS + Shadcn UI
- **HTTP Client**: Axios
- **Testing**: Vitest + Vue Test Utils
- **Build Tool**: Vite
- **Package Manager**: Bun

## Prerequisites

Before running this project, make sure you have the following installed:
- [Bun](https://bun.sh/) (Package manager)
- [Node.js](https://nodejs.org/) (v18 or higher)

## Project Setup

1. Clone the repository:
```sh
git clone <repository-url>
cd habit-tracker/frontend
```

2. Install dependencies:
```sh
bun install
```

3. Create a `.env` file in the project root and add your environment variables:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

4. Start the development server:
```sh
bun dev
```

## Available Scripts

- **Development**:
  ```sh
  bun dev
  ```

- **Production Build**:
  ```sh
  bun run build
  ```

- **Unit Tests**:
  ```sh
  bun test:unit
  ```

- **Type Checking**:
  ```sh
  bun run type-check
  ```

- **Linting**:
  ```sh
  bun lint
  ```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Vue components
│   ├── layout/     # Layout components
│   └── ui/         # UI components
├── lib/            # Utilities and configurations
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── types/          # TypeScript types
└── views/          # Page components
```

## Testing

The project uses Vitest for unit testing. Tests can be found in `__tests__` directories next to the files they test.

Run the tests with:
```sh
bun test:unit
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

Additional documentation can be found in the following files:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and design
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes
- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Technical implementation details

## IDE Setup

We recommend using [VSCode](https://code.visualstudio.com/) with the following extensions:
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Version

Current version: 0.1.0

See [CHANGELOG.md](./CHANGELOG.md) for details about changes and new features.
