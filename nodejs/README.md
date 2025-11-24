# Node.js MySQL Railway App

This project is a simple web application built with Node.js and MySQL, deployed on Railway.app. It provides functionalities to add, update, delete, and search for products. The application uses Express.js for the server framework and EJS for templating.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new products
- Update existing products
- Delete products
- Search for products
- User-friendly interface

## Technologies

- Node.js
- Express.js
- MySQL
- EJS
- CSS
- JavaScript
- Railway.app for deployment

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nodejs-mysql-railway-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   Copy the `.env.example` to `.env` and fill in your MySQL database connection details:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. **Run the application locally:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## Deployment

To deploy the application on Railway.app:

1. **Create a Railway account** and log in.
2. **Create a new project** and select the option to deploy from a GitHub repository.
3. **Connect your GitHub repository** containing this project.
4. **Set up environment variables** in Railway based on your `.env` file.
5. **Deploy the application** and wait for the process to complete.

## Usage

Once deployed, you can access the application through the provided Railway URL. You can add, update, delete, and search for products using the web interface.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.