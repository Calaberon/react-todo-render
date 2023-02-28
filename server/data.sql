CREATE DATABASE todoapp;

CREATE TABLE todos (
    id VARCHAR(300) PRIMARY KEY,
    user_email VARCHAR(250),
    title VARCHAR(50),
    progress INTEGER,
    date VARCHAR(300)
);

CREATE TABLE users (
    email VARCHAR(250) PRIMARY KEY,
    hashed_password VARCHAR(250)
);