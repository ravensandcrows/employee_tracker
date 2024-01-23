const inquirer = require('inquirer');
const questions = require('./questions');
const title = require("asciiart-logo");
const db = require('../db');
const queries = require('../db/functions');

function startAgain() {
    cli();
}
// Display logo text, load main prompts
function init() {
    const titleText = title({ name: "Employee And Department Manager" }).render();
    console.log(titleText);
}

function cli() {
    inquirer
        .prompt(questions)
        .then(answers => {
            switch (`${answers.options}`) {
                case 'View':
                    if (`${answers.view}` === 'View All Departments') {
                        queries.viewDepartments();
                        startAgain();
                    }
                    else if (`${answers.view}` === 'View All Roles') {
                        queries.viewRoles();
                        startAgain();
                    }
                    else if (`${answers.view}` === 'View All Employees') {
                        queries.viewEmployees();
                        startAgain();
                    }
                    else if (`${answers.view}` === 'View Employees by Manager') {
                        viewEmployeesByManager();
                    }
                    else if (`${answers.view}` === 'View Employees by Department') {
                        viewEmployeesByDepartment();
                    }
                    else if (`${answers.view}` === 'View Total Utilized Budget') {
                        viewBudget();
                    }
                    else {
                        startAgain();
                    }
                    break;
                case 'Add':
                    if (`${answers.add}` === 'Add a Role') {
                        addRole();
                    }
                    else if (`${answers.add}` === 'Add an Employee') {
                        addEmployee();
                    }
                    else if(`${answers.add}` === 'Add a Department'){
                        addDepartment();
                    }
                    else {
                        startAgain();
                    }
                    break;
                case 'Update':
                    if (`${answers.update}` === 'Update Employee Role') {
                        console.log('Update Employee Role');
                        startAgain();
                    }
                    else if (`${answers.update}` === 'Update Employee Managers') {
                        console.log('Update Employee Managers');
                        startAgain();
                    }
                    else {
                        console.log('cancel');
                        startAgain();
                    }
                    break;
                case 'Delete':
                    if (`${answers.delete}` === 'Departments') {
                        console.log('Remove Department');
                        startAgain();
                    }
                    else if (`${answers.delete}` === 'Roles') {
                        console.log('Remove Roles');
                        startAgain();
                    }
                    else if (`${answers.delete}` === 'Employees') {
                        console.log('Terminate Employee')
                        startAgain();
                    }
                    else {
                        console.log('cancel');
                        startAgain();
                    }
                    break;
                case 'END':
                    console.log('Goodbye!')
                    process.exit();
            }
        });
}

//VIEWS:
//view all employees that report to a specific manager
function viewEmployeesByManager() {
    db.searchAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const mChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            console.log("\n");
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "managerID",
                        message: "Who would you like to see direct reports for?",
                        choices: mChoices
                    }
                ])
                .then(res => db.searchAllEmployeesByManager(res.managerID))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    if (employees.length === 0) {
                        console.log("This employee has no direct reports");
                        console.log("\n");
                    }
                    else {
                        console.table(employees);
                        console.log("\n");
                    }
                })
                .then(() => startAgain())
        });
}
//view all by department
function viewEmployeesByDepartment() {
    db.searchAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const depChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "departmentID",
                        message: "Which department's employees would you like to see?",
                        choices: depChoices
                    }
                ])
                .then(res => db.searchAllEmployeesByDepartment(res.departmentID))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    console.table(employees);
                })
                .then(() => startAgain())
        });
}
//all departments + their total utilized budget
function viewBudget() {
    db.findDepartmentBudget()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => startAgain());
}

//ADD
function addRole() {
    db.searchAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const depChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            inquirer
                .prompt([
                    {
                        name: "title",
                        message: "Name of the new role:"
                    },
                    {
                        name: "salary",
                        message: "Salary of the new role:",
                        validate: function (value) {
                            if (/^\d+$/.test(value)) {
                                return true;
                            } else {
                                return 'Please enter a whole number without commas or decimals';
                            }
                        }
                    },
                    {
                        type: "list",
                        name: "department_id",
                        message: "Department for the new role:",
                        choices: depChoices
                    }
                ])
                .then(role => {
                    db.buildRole(role)
                        .then(() => console.log(`${role.title} added to the database`))
                        .then(() => startAgain())
                })
        })
}

// Add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                message: "Enter employee's first name:"
            },
            {
                name: "last_name",
                message: "Enter employee's last name:"
            }
        ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.searchAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const rChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                    inquirer
                        .prompt({
                            type: "list",
                            name: "roleID",
                            message: "What is the employee's role?",
                            choices: rChoices
                        })
                        .then(res => {
                            let roleID = res.roleID;

                            db.searchAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });
                                    inquirer.
                                        prompt({
                                            type: "list",
                                            name: "managerID",
                                            message: "Who is this employee's manager?",
                                            choices: managerChoices
                                        })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerID,
                                                role_id: roleID,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.newEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `${firstName} ${lastName} added to the team!`
                                        ))
                                        .then(() => startAgain())
                                })
                        })
                })
        })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "name",
                message: "Name of the new department:"
            }
        ])
        .then(res => {
            let name = res;
            db.buildDepartment(name)
                .then(() => {
                    console.log('\n');
                    console.log(`Department: ${name.name} added to the database`);
                    console.log('\n');
                })
                .then(() => startAgain())
        })
}

module.exports = cli;