# Development Rules and Guidelines

## Vue 3 Rules
- Use Composition API with `setup()` for component logic
- Use `ref`, `reactive`, and `computed` for state management
- Create small, reusable components with clear props and emits
- Use `defineProps` and `defineEmits` with proper TypeScript types
- Use Pinia for application-wide state management
- Use Vue Router for navigation
- Use clear template syntax with directives (`v-if`, `v-for`, `v-bind`, `v-on`)
- Document components with purpose, props, events, and slots

## Tailwind CSS Rules
- Use Tailwind utility classes primarily
- Use responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Extend Tailwind config for customization
- Use semantic class names
- Avoid custom CSS unless necessary

## Shadcn UI Rules
- Use pre-built components for consistency
- Follow recommended customization methods
- Utilize provided props for configuration

## Package Management
- Always use bun instead of npm

## Code Quality
- Write clear, maintainable code
- Use meaningful variable and function names
- Keep functions focused and short
- Follow DRY principle
- Handle errors gracefully
- Use TypeScript for better type safety
- Document code thoroughly

## State Management
- Use Pinia stores for:
  - User authentication state
  - Habits list
  - Current habit details
  - Habit logs

## Component Structure
- Create atomic design structure:
  - atoms/ (basic UI elements)
  - molecules/ (combinations of atoms)
  - organisms/ (complex UI sections)
  - templates/ (page layouts)
  - pages/ (route components)

## Routing
- Implement protected routes for authenticated users
- Use nested routes where appropriate
- Maintain clean URL structure

## API Integration
- Create dedicated API service layer
- Use TypeScript interfaces for API responses
- Handle loading and error states
- Implement proper error handling

## UI/UX Guidelines
- Create beautiful, modern, sleek design
- Ensure responsive layout
- Follow accessibility best practices
- Use consistent spacing and typography
- Implement smooth transitions and animations
- Use loading states for async operations

## Documentation
- Keep documentation up-to-date
- Document component APIs
- Include setup instructions in README
- Document state management patterns
- Add comments for complex logic
