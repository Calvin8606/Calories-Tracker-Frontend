# Calorie Tracker Frontend

This is the frontend for the Calorie Tracker application, built using React and TypeScript. This frontend communicates with the backend API to allow users to track their daily calorie intake, manage their profile, and update settings.

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Calorie Tracking**: Users can search for food items, add them to their daily log, and see the calories consumed and remaining.
- **Profile Management**: Users can view their profile information.
- **Settings**: Users can update their phone number and password.
  
## Technologies Used

- **React** and **TypeScript**
- **Vite** as the build tool and development server for faster builds and better developer experience.
- **Axios** for handling HTTP requests.
- **Tailwind CSS** for styling.

## Installation and Setup

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    ```

2. **Navigate to the frontend directory**

    ```bash
    cd calorie-tracker-frontend
    ```

3. **Install dependencies**

    ```bash
    npm install
    ```

4. **Run the application**

    ```bash
    npm run dev
    ```

    This will start the Vite development server. The app will be available at `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory with the following variable:

```plaintext
VITE_API_BASE_URL=http://localhost:8080/api
