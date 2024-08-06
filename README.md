# MovieMate Ticketing

Welcome to the Fullstack MovieMate Ticketing Project! This guide will help you set up and run the project on your local machine.

## Table of Contents
- [Functionalities](#functionalities)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Clone the Repository](#1-clone-the-repository)
  - [Install Dependencies](#2-install-the-dependencies)
  - [Set Up the Database](#3-set-up-the-database)
    - [Using Docker](#using-docker)
    - [Connecting to MySQL in Docker with MySQL Workbench](#connecting-to-mysql-in-docker-with-mysql-workbench)
    - [Import the Backup File](#import-the-backup-file)
  - [Set Up Environment Variables](#4-set-up-environment-variables)
  - [Running the Project](#5-running-the-project)
    - [Start the Backend Server](#start-the-backend-server)
    - [Start the Frontend Server](#start-the-frontend-server)

## Functionalities

![Register](frontend/src/assets/register.gif)
![Sign In](frontend/src/assets/sign_in.gif)
![Tickets](frontend/src/assets/profile_tickets.gif)

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:
- **Node.js** (https://nodejs.org/)
- **npm** (https://www.npmjs.com/)
- **Angular CLI** (https://angular.io/cli)
- **MySQL** (https://www.mysql.com/)
- **Java JDK** (https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- **Maven** (https://maven.apache.org/)
- **Git** (https://git-scm.com/)
- **Docker Desktop** (https://www.docker.com/products/docker-desktop)
- **MySQL Workbench** (https://www.mysql.com/products/workbench/) (optional)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/damlaSevinc/MovieMate-Ticketing.git
    cd MovieMate-Ticketing
    ```

2. **Install the dependencies**:
   ```bash
    cd frontend
    npm install
    ```

3. **Set up the database**:

    ### Using Docker:
    - **Pull the MySQL Docker Image**:
    ```bash
    docker pull mysql:latest
    ```
    - **Run the MySQL Docker Container**:
    ```bash
    docker run --name movie_mate -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=movie_mate -e MYSQL_USER=movie_mate_user -e MYSQL_PASSWORD=movie_mate_pass -d mysql:latest
    ```

    ### Connecting to MySQL Server in Docker (optional with MySQL Workbench):

    - **If you use Workbench, launch MySQLWorkbench and set up a new connection**:
        - **Hostname**: `localhost` or `127.0.0.1`
        - **Port**: `3306`
        - **Username**: `movie_mate_user`
        - **Password**: `movie_mate_pass`

    - **Test the connection**:
        - Click on the `Test Connection` button to ensure the connection is successful

    - **Import the Backup File**
        - Run the following command in your terminal to import the from the schema and data
        ```bash
         docker exec -i movie_mate_mysql mysql -u movie_mate_user -p movie_mate_pass movie_mate < db/backup.sql
        ```
        - Or import through MySQLWorkbench using the following path `db/backup.sql`

    - **Verify Import**
        - Check your MySQL Server to ensure the database has been populated with the necessary tables and data

4. **Set up environment variables**:
    - Review `application.yml` file located in the `backend/src/main/resources` directory
    - Ensure it contains the following database credentials for your local setup
    ```yaml
    spring.datasource.url=jdbc:mysql://localhost:3306/movie_mate
    spring.datasource.username=movie_mate_user
    spring.datasource.password=movie_mate_pass
    ```
    - Replace `movie_mate_user` and `movie_mate_pass` with your MySQL username and password if necessary

5. **Running the project**:
    - **Start the backend server**:
    ```bash
    cd backend
    mvn spring-boot:run
    ```
    - **Start the frontend server**:
    ```bash
    cd frontend
    ng serve -o
    ```
    Or run:
    ```bash
    ng serve
    ```
    Then navigate to `http://localhost:4200/` in your browser.
