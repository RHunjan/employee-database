DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS role;
 


CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
    );

CREATE TABLE role (
    title VARCHAR(30) NOT NULL,
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_id INTEGER,
    salary DECIMAL NOT NULL
);
 
CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    role_id INTEGER,
    manager_id INTEGER
);
 