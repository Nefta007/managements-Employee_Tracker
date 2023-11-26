const userConnect = require("../config/connection");
const connection = require("../config/connection");
//this.con = connection;
function employerAction(user_choice){
    if (user_choice === 'View all roles'){
        getRole();
    }
    if(user_choice === 'View all employees'){
        viewEmployee();
    }
    else if(user_choice === 'Add a department'){
        console.log('hello');
    }
    else if(user_choice === 'Add a role'){
        console.log('hello');
    }
    else if(user_choice === 'Add an employee'){
        console.log('hello');
    }
    else if(user_choice === 'Update an employee role'){
        console.log('hello');
    }
}
const getRole = () =>{
connection.promise().query(`
SELECT 
roles.title,
roles.id,
roles.salary,
department.dep_name AS department 
FROM roles 
INNER JOIN department ON roles.department_id = department.id`)
.then(([data])=>console.table(data));
};

const viewEmployee = () =>{
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
.then(([data])=>console.table(data));
//CONCAT(manEmployee.first_name, " ", manEmployee.last_name) AS manager
// JOIN employee manEmployee ON employee.manager_id = manEmployee.id
}


module.exports = employerAction;