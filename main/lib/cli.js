const inquirer = require('inquirer');
const questions = require('./questions');
const title = require("asciiart-logo");
const db = require('../db');
const queries = require('../db/functions');

function startAgain(){
    cli();
}
// Display logo text, load main prompts
function init() {
    const titleText = title({ name: "Employee And Department Manager" }).render();
    console.log(titleText);
}

function cli(){
        inquirer
        .prompt(questions)
        .then(answers=>{
            switch(`${answers.options}`){
                case 'View':
                    if(`${answers.view}` === 'View All Departments'){
                        queries.viewDepartments();
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View All Roles'){
                        queries.viewRoles();
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View All Employees'){
                        queries.viewEmployees();
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View Employees by Manager'){
                        viewEmployeesByManager();
                    }
                    else if(`${answers.view}` === 'View Employees by Department'){
                        viewEmployeesByDepartment();
                    }
                    else if(`${answers.view}` === 'View Total Utilized Budget'){
                        viewBudget();
                    }
                    else{
                        startAgain();
                    }
                    break;
                case 'Add':
                    if(`${answers.add}` ==='Add a Role'){ 
                        console.log('Add a Role');
                        startAgain();
                    }
                    else if(`${answers.add}` === 'Add an Employee'){
                        console.log('Add an Employee');
                        startAgain();
                    }
                    else{
                        console.log('cancel');
                        startAgain();
                    }
                    break;
                case 'Update':
                    if(`${answers.update}` === 'Update Employee Role'){ 
                        console.log('Update Employee Role');
                        startAgain();
                    }
                    else if(`${answers.update}` === 'Update Employee Managers'){
                        console.log('Update Employee Managers');
                        startAgain();
                    }
                    else{
                        console.log('cancel');
                        startAgain();
                    }
                    break;
                case 'Delete':
                    if(`${answers.delete}` === 'Departments'){ 
                        console.log('Remove Department');
                        startAgain();
                    }
                    else if(`${answers.delete}` ==='Roles'){
                        console.log('Remove Roles');
                        startAgain();
                    }
                    else if(`${answers.delete}` ==='Employees'){
                        console.log('Terminate Employee')
                        startAgain();
                    }
                    else{
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

//view all employees that report to a specific manager
function viewEmployeesByManager() {
    db.searchAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            console.log("\n");
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "managerId",
                        message: "Which employee do you want to see direct reports for?",
                        choices: managerChoices
                    }
                ])
                .then(res => db.searchAllEmployeesByManager(res.managerId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    if (employees.length === 0) {
                        console.log("The selected employee has no direct reports");
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
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
        inquirer
        .prompt([
          {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: departmentChoices
          }
        ])
          .then(res => db.searchAllEmployeesByDepartment(res.departmentId))
          .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
          })
          .then(() => startAgain())
      });
}

//  all departments + their total utilized budget
function viewBudget() {
    db.findDepartmentBudget()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => startAgain());
}


module.exports = cli;