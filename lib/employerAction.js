const connection = require("../config/connection");
const cTable = require('console.table');
const inquirer = require('inquirer');
//this.con = connection;
function employerAction(user_choice) {
    switch (user_choice) {
        case 'View all departments':
            viewDepartment();
            break;
        case 'View all roles':
            getRole();
            break;
        case 'View all employees':
            viewEmployee();
            break;
        case 'Add a department':
            addDepartment();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            console.log('added employee');
            break;
        case 'Update an employee role':
            console.log('employee role updated');
            break;
    }
}

const viewDepartment = () => {
    connection.promise().query(`
    SELECT 
    department.id AS id,
    department.dep_name AS department
    From department`)
        .then(([data]) => console.table(data));
};

const getRole = () => {
    connection.promise().query(`
SELECT 
roles.title,
roles.id,
roles.salary,
department.dep_name AS department 
FROM roles 
INNER JOIN department ON roles.department_id = department.id`)
        .then(([data]) => console.table(data));
};

const viewEmployee = () => {
    connection.promise().query(`
SELECT 
employee.id,
employee.first_name,
employee.last_name,
roles.title,
roles.salary,
department.dep_name, 
CONCAT(manEmployee.first_name, " ", manEmployee.last_name) AS manager
FROM employee
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department.id
LEFT JOIN employee as manEmployee ON employee.manager_id = manEmployee.id`)
        .then(([data]) => console.table(data));
};

const addDepartment = () => {
    inquirer.prompt([{
        type: "input",
        name: "newDepartment",
        message: "What is the name of the Department you wish to add?"
    }]).then((answer) => {
        connection.promise().query(`INSERT INTO department (dep_name) VALUE (?)`, answer.newDepartment);
        viewDepartment();
    })
};

const addRole = () =>{
    console.log('hello');
};


module.exports = employerAction;