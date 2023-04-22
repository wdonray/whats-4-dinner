# Whats-4-Dinner

Welcome to Whats-4-Dinner, a web application that uses the OpenAI API to generate unique recipes for users. This project is written in Vue and uses Firebase for user authentication and recipe storage. It also utilizes Vite for development, Eslint for linting, and Prettier for code formatting. All UI components are written from scratch in Vue using CSS, HTML, and JavaScript.

## Table of Contents

- [Whats-4-Dinner](#whats-4-dinner)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To install the project locally, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/<your-github-username>/whats-4-dinner.git`
2. Install the necessary dependencies using `npm install`
3. Create a Firebase account and set up authentication and database storage
4. Add your Firebase configuration information to a `.env` file in the root of the project, using the following format:

```json
# ChatGPT API keys
VITE_BASE_URL=<chat-gpt-base-url> EX: https://api.openai.com/v1/
VITE_CHAT_GPT_API=<your-chat-gpt-api-key>

# Firebase config
VITE_FIREBASE_API_KEY=<your-firebase-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
VITE_FIREBASE_APP_ID=<your-firebase-app-id>
VITE_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>
```

5. Run the project using `npm run dev`

## Usage

Once the project is running, users can create an account, log in, and generate unique recipes using the OpenAI API. Recipes can be saved to their account and viewed later.

## Features

- User authentication and account creation using Firebase
- Recipe generation using the OpenAI API
- Recipe storage and retrieval using Firebase
- Responsive UI design using CSS, HTML, and JavaScript
- Linting using Eslint and code formatting using Prettier
- Development environment using Vite

## Contributing

If you'd like to contribute to Whats-4-Dinner, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a descriptive message
4. Push your changes to your forked repository
5. Create a pull request to the main repository, describing your changes and why they should be merged

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
