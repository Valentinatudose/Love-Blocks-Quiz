# Deployment and Brevo Integration Guide

This guide provides instructions for deploying the quiz to your live website and integrating it with your Brevo account via a backend serverless function.

---

## 1. Deploying the Frontend Quiz

This quiz is built as a self-contained frontend application. To add it to your website, follow these steps:

1.  **Upload Frontend Files**: Copy all the frontend project files and folders (`index.html`, `index.tsx`, `App.tsx`, `constants.ts`, `types.ts`, `metadata.json`, `package.json`, `vercel.json`, and the `components` folder) into a new directory on your web server (e.g., `/quiz`).

2.  **Deploy the Backend Function**: You must also deploy the backend function located in the `api` folder. See the instructions in Section 2.

3.  **Access the Quiz**: Once both parts are deployed, you should be able to access the quiz by navigating to `https://yourwebsite.com/quiz/index.html`.

---

## 2. Backend Integration (Instructions for Your Developer)

To capture leads and add them to the correct Brevo list, you need to deploy the provided backend function. The frontend is already configured to send data to it.

### Backend Developer's Task:

Your project now contains an `api` folder and a `package.json` file. The file `api/subscribe.js` is a **serverless function** designed to be deployed on a platform like Vercel, Netlify, or your own Node.js server.

Your task is to deploy this function so it's accessible at the URL `/api/subscribe`.

### Step-by-Step Deployment Guide:

1.  **Dependencies**: The project now includes a `package.json` file that lists the required `@getbrevo/brevo` dependency.
    *   **On Vercel/Netlify**: These platforms will automatically read this file and install the dependencies during the build process. No extra action is needed.
    *   **On a Custom Server**: If deploying manually, you must run `npm install` in the project's root directory to install the required packages.

2.  **Set Environment Variable**: This is the most critical step for security. On your hosting platform (Vercel, Netlify, AWS, etc.), you must set a **server-side environment variable** named `BREVO_API_KEY` and set its value to your Brevo v3 API key.
    *   **DO NOT** write the API key directly in the `subscribe.js` file.
    *   The code `process.env.BREVO_API_KEY` will automatically and securely read this value on the server.

3.  **Deployment & Routing**:
    *   **On Vercel/Netlify**: These platforms will automatically detect the `api` folder. They will build and deploy the `subscribe.js` file as a serverless function, making it available at the correct URL (`/api/subscribe`) without extra configuration. The new `vercel.json` file provides additional hints to ensure this works smoothly.
    *   **On a Custom Server (e.g., Express)**: You would need to set up a route that listens for `POST` requests to `/api/subscribe` and executes the logic from the `subscribe.js` file.

### Backend Function Logic (`api/subscribe.js`):

The function is already written to:
-   **Accept** a `POST` request with a JSON payload:
    ```json
    {
      "name": "Jane",
      "email": "jane.doe@example.com",
      "result": "DRAMA_MAGNET"
    }
    ```
-   **Map** the quiz `result` to the correct Brevo list ID (these are pre-filled for you).
-   **Securely** use the `BREVO_API_KEY` from environment variables.
-   **Call** the Brevo API to add or update the contact in the specified list.
-   **Return** a `200 OK` on success or a descriptive error message on failure, which the frontend will display to the user.
