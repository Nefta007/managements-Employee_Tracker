const inquirer = require('inquirer');
//const fs = require('fs');
const management = require('./lib/employerAction');
const connect = require('./config/connection');

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
                    "Update an employee role",
                    "Quit"
                ],
            }
        ]).then((answers) => {
            let { user_choice } = answers;
            // console.log(user_choice);
            management(user_choice);
        })

}

init();