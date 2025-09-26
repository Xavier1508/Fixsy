# Fixsy

A hyperlocal community platform designed to connect neighbors for micro-services and mutual assistance.

## About The Project

Fixsy is a web application that aims to strengthen local communities by creating a trusted and efficient platform for exchanging services. It connects individuals who need help with small tasks, repairs, or errands with reliable neighbors who have the skills and time to assist.

The goal is to move beyond traditional service directories and foster a sense of community collaboration. Whether you need a hand assembling furniture, looking for a local tutor, or want to offer your own skills to the neighborhood, Fixsy provides the digital space to make those connections happen.

### Key Features (Planned)

* **Service Requests:** Users can post detailed requests for tasks they need help with.
* **Neighbor Profiles:** Secure and verified profiles for users to build trust within the community.
* **Location-Based Discovery:** Easily find tasks and skilled neighbors in your immediate vicinity.
* **Internal Messaging:** A secure communication channel for users to discuss details and coordinate.
* **Rating and Review System:** Build reputation and ensure quality service through community feedback.

### Tech Stack

This project is built using the MERN stack and modern development tools.

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB

## Getting Started

Follow these instructions to get a local copy of the project up and running on your machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your system:
* Node.js (v18.x or later)
* npm (or yarn)
* MongoDB (local instance or a cloud-based service like MongoDB Atlas)

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/fixsy.git](https://github.com/your-username/fixsy.git)
    ```

2.  **Navigate to the project directory**
    ```sh
    cd fixsy
    ```

3.  **Install Backend Dependencies**
    ```sh
    cd backend
    npm install
    ```

4.  **Install Frontend Dependencies**
    ```sh
    cd ../frontend
    npm install
    ```

5.  **Set Up Environment Variables**

    In the `backend` directory, create a `.env` file. This file will store your secret keys and database connection strings. Add the following variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=8000
    ```

## Running the Application

You will need to run the backend and frontend servers in two separate terminals.

1.  **Run the Backend Server**
    ```sh
    cd backend
    npm run dev 
    ```
    The server should now be running on `http://localhost:8000` (or the port you specified).

2.  **Run the Frontend Development Server**
    ```sh
    cd frontend
    npm run dev
    ```
    The application will be available to view in your browser at `http://localhost:5173` (or the port specified in your terminal).

## License

This project is licensed under the MIT License.
