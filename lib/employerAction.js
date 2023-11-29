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

const addRole = () => {
    const userDepo = `SELECT * FROM department`;
    connection.query(userDepo, (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: "input",
            name: "newRole",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "newSalary",
            message: "What is the salary for the new person",
        },
        {
            type: 'list',
            name: "department",
            message: "What department will they be under",
            choices: res.map((department) => department.dep_name),
        },
        ]).then((answer) => {
            //console.log(answer.department);
            //method found on youtube needs to be fixed since does not work properly
            let newDepartId = answer.department;
            const obtainId = getDepartmentId(newDepartId);
            const [departRow] = obtainId;
            const rowId = Object.values(departRow[0])[0];
            console.log(rowId);

            // const new_role = answer.newRole;
            // const new_salary = answer.newSalary;
            // // ?const department = res.find((department) => department.name === answer.department);
            // connection.promise().query(`INSERT INTO roles SET ?`, { title: answer.newRole, salary: answer.newSalary, department_id: answer.department, },);
            //getRole();
        });
        const getDepartmentId = (newDepartId) =>{
            //console.log(newDepartId);//test to see if function works properly
            connection.query(`SELECT id FROM department WHERE dep_name = "${newDepartId}"`);
            
        };
    });
    // inquirer.prompt([{
    //     type: "input",
    //     name: "newRole",
    //     message: "What is the name of the role?",
    // },
    // {
    //     type: "input",
    //     name: "newSalary",
    //     message: "What is the salary for the new person",
    // },
    // {
    //     type: 'list',
    //     name: "roleDepartment",
    //     message: "What department will they be under",
    //     choices: roleDepo,
    // }
    // ]).then((answer) => {
    //     const new_role = answer.newRole;
    //     const new_salary = answer.newSalary;
    //     const newDep = answer.roleDepartment;
    //      connection.promise().query(`
    //      INSERT INTO roles (title, salary, department_id) VALUE (?)
    //      FROM roles
    //     JOIN department ON roles.department_id = department.id 
    //      `, new_role, new_salary, newDep);
    //     getRole();
    // })
    
};



module.exports = employerAction;