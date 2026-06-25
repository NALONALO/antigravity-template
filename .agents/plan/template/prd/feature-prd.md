# FEATURE PRD: [Feature Name]

> **AI Agent Instruction:** This is a module-specific feature specification. You must adhere to the global architecture and coding standards defined in the `APP_CORE.md` file while implementing this feature. 

## 1. Feature Objective
*   **Goal:** [One or two sentences explaining what this feature does, e.g., "Allow users to authenticate using their Google account or email/password."]
*   **Success Criteria:** [What defines the feature as complete, e.g., "User can log in, receive a session token, and be redirected to the dashboard."]

## 2. User Flow
List the exact step-by-step interaction the user will have with this feature.
1. [e.g., User clicks 'Sign In' on the navigation bar.]
2. [e.g., A modal opens with 'Sign in with Google' and an email/password form.]
3. [e.g., Upon successful submission, user is routed to `/dashboard`.]
4. [e.g., Upon failure, an inline error message is displayed.]

## 3. UI/UX Requirements
*   **Components Needed:** [e.g., `LoginForm`, `GoogleAuthButton`, `AuthModal`]
*   **State / Inputs:** [e.g., Email (string), Password (string), LoadingState (boolean)]
*   **Validation:** [e.g., Email must be a valid format, password minimum 8 characters.]

## 4. Technical Requirements
Define the specific backend, database, and API logic required for this module.

### A. Data Schema Changes
*   **Model/Table:** `[Model Name]`
*   **New Fields:** 
    *   `[fieldName]`: `[Type]` - `[Description/Constraint]`
    *   [e.g., `lastLogin`: `DateTime` - `Nullable`]

### B. API Endpoints / Server Actions
*   **Route:** `[e.g., POST /api/auth/login]`
*   **Payload (Request):** `[e.g., { email, password }]`
*   **Response (Success):** `[e.g., { status: 200, user: UserObject }]`
*   **Response (Error):** `[e.g., { status: 401, message: "Invalid credentials" }]`

## 5. Edge Cases & Error Handling
Explicitly state how the AI should handle anomalies.
*   [e.g., What happens if the user enters the wrong password 5 times? -> "Display a 'Rate limited, try again in 5 minutes' message."]
*   [e.g., What happens if the database is unreachable? -> "Return a 500 error and show a generic 'Service unavailable' toast notification."]