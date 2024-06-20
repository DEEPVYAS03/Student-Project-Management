# Student Project Management

## Introduction

This project is a comprehensive solution for enhanced project management, featuring intuitive user interfaces and robust backend integration. It includes functionalities such as file sharing, meeting scheduling, chat functionality, and task scheduling for seamless team collaboration.

### Tech Stack:
- **Frontend**: React Native
- **Backend**: Node.js, Express
- **Database**: MongoDB


## Backend Setup

1. Create a `.env` file in the `backend` folder with the following content:

    ```plaintext
    MONGO_URI=your_mongourl
    JWT_SECRET=your_secret
    ```

2. Install the backend dependencies and run the server:

    ```bash
    cd backend
    npm install
    nodemon server.js
    ```

## Frontend Setup

1. Update the IP address in `ipconstant.jsx` in ipconstant folder:

    ```javascript
    export default ip = 'http://{your ip address}:5000'
    ```

2. Install the frontend dependencies and run the application:

    ```bash
    cd appfrontend
    npm install
    npm start
    ```

## Screenshot

![project management](https://github.com/DEEPVYAS03/Student-Project-Management/assets/113181349/92f27fe0-e8f5-4532-a8a1-5f49a142d917)

