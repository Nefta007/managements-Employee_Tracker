const inquirer = require('inquirer');
//const fs = require('fs');

const init = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: 'user_choice',
                message: 'What would you like to do?',
                choices: [
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role"
                ],
            }
        ]).then((answers) => {
            let {usreChoice} = answers;
            console.log(usreChoice);

        })
}

init();