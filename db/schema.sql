DROP DATABASE IF EXIST  curr_employee;
CREATE DATABASE curr_employee;

USE curr_employee;

CREATE TABLE department (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name: VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary: DECIMAL,
    department_id: INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT,
    manager_id: INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);
