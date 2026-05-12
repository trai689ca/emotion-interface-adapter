I want to refactor my existing Vite/React app into a production-ready accessibility-first AI web application called AccessEase AI.

The app is designed specifically for people with disabilities, including blind or low-vision users, neurodivergent users, people with cognitive disabilities, people with motor disabilities, Deaf or hard-of-hearing users, and people with speech or communication disabilities.

The core purpose of the app is to help users understand difficult information, complete digital tasks, and communicate accessibility needs using an AI assistant.

Build the app with:
- React + Vite
- TypeScript if possible
- accessible semantic HTML
- WCAG 2.2 AA-oriented design
- keyboard navigation
- visible focus states
- ARIA only where appropriate
- responsive layout
- localStorage for accessibility preferences
- no API key exposed in the frontend
- serverless API route for AI calls
- clean component structure
- production-ready code

Main pages/features:

1. Home page
- Explain the purpose of AccessEase AI in plain language.
- Include large accessible buttons:
  - AI Assistant
  - Simplify Text
  - Accommodation Message Builder
  - Quick Communication Board
  - Accessibility Settings

2. AI Assistant
- Accessible chatbot interface.
- User can ask questions.
- AI responses should default to plain language.
- Include toggles:
  - Short answer
  - Step-by-step
  - Plain language
  - Read aloud
- Responses should be screen-reader friendly.
- Add disclaimer: this is not legal, medical, financial, or emergency advice.

3. Simplify Text
- Textarea where user pastes difficult text.
- Button: “Make this easier to understand.”
- AI should return:
  - short summary
  - plain-language explanation
  - action checklist
  - difficult words explained
  - questions the user may need to ask

4. Accommodation Message Builder
- User selects context:
  - Work
  - School
  - Healthcare
  - Government service
  - Housing
  - Appointment
  - Online form
- User describes their need.
- AI generates a respectful accessibility/accommodation request message.
- Include copy button.

5. Quick Communication Board
- AAC-inspired communication board.
- Include large buttons such as:
  - I need help
  - Please explain again
  - I need more time
  - Please use simpler words
  - I need this in writing
  - I use assistive technology
  - I cannot access this form
- When clicked, show generated message.
- Include copy and read-aloud buttons.

6. Accessibility Settings
- Large text
- Extra large text
- High contrast
- Reduced motion
- Increased spacing
- Simple language mode
- Dyslexia-friendly font option
- Hide visual distractions
- Reset all settings
- Save all preferences to localStorage

7. Read Aloud
- Use the browser SpeechSynthesis API.
- Every AI response and generated message should have a “Read aloud” button.
- Include “Stop reading” button.

8. Privacy and Safety
- Add a Privacy Notice page.
- Tell users not to enter highly sensitive personal, medical, legal, or financial information.
- Add safe AI disclaimer.
- Add crisis/emergency disclaimer: if this is an emergency, contact local emergency services.

9. Technical requirements
- Create reusable components:
  - Layout
  - Header
  - AccessibleButton
  - AccessibilityPanel
  - ChatInterface
  - TextSimplifier
  - AccommodationBuilder
  - QuickCommunicationBoard
  - ReadAloudButton
  - DisclaimerBox
- Add clear comments so a non-technical person can understand the code.
- Keep the UI professional, calm, and adult.
- Do not use childish colors or playful language.
- Use plain, respectful, disability-centered language.

10. AI integration
- Prepare the app to use OpenAI API through a backend/serverless route.
- Do not expose the API key in frontend code.
- Use environment variable:
  VITE_OPENAI_API_KEY only if safe for local testing, but prefer serverless backend.
- Create a function that sends user input and task type to AI:
  task types:
  - chat
  - simplify_text
  - accommodation_message
  - communication_message
- Add fallback mock responses if API key is missing.

The final app should feel like a real user-facing accessibility support tool, not a demo.
11. Minimal Source Code Requirement

Keep the source code as minimal, clean, and easy to understand as possible because the project owner is non-technical.

Avoid unnecessary complexity.

Requirements:
- Use the fewest reasonable number of files.
- Avoid over-engineering.
- Avoid unnecessary libraries.
- Do not add complex state management like Redux.
- Use simple React state and localStorage only.
- Keep CSS simple and centralized.
- Use clear component names.
- Keep functions short and readable.
- Add comments only where they help a non-technical person understand the code.
- Do not create too many nested folders.
- Do not create experimental features unless requested.
- Prioritize a working, accessible, production-ready app over complex architecture.

Preferred file structure:

src/
  App.jsx or App.tsx
  main.jsx or main.tsx
  styles.css
  ai.js or ai.ts
  accessibility.js or accessibility.ts
  components/
    Header.jsx
    AccessibleButton.jsx
    ChatInterface.jsx
    TextSimplifier.jsx
    AccommodationBuilder.jsx
    QuickCommunicationBoard.jsx
    AccessibilitySettings.jsx
    ReadAloudButton.jsx
    DisclaimerBox.jsx

Keep the app understandable enough that a beginner can open the files and understand what each part does.
Important: The source code should be production-ready but minimal. Do not over-engineer the app. Keep the structure simple enough for a non-technical person to understand and maintain.