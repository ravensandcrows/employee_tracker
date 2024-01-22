const inquirer = require('inquirer');
const questions = require('./questions');
const title = require("asciiart-logo");
const db = require('../db');
const queries = require('../db/functions');

function startAgain(){
    const cli = new CLI();
    cli.run();
}
// Display logo text, load main prompts
function init() {
    const logoText = title({ name: "Employee And Department Manager" }).render();
    console.log(logoText);
}

class CLI{
    run(){
        init();
        inquirer
        .prompt(questions)
        .then(answers=>{
            switch(`${answers.options}`){
                case 'View':
                    if(`${answers.view}` === 'View All Departments'){
                        console.log('View All Departments');
                        queries.viewDepartments();
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View All Roles'){
                        console.log('View All Roles');
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View All Employees'){
                        console.log('View All Employees');
                        queries.viewEmployees();
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View Employees by Manager'){
                        console.log('View Employees by Manager');
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View Employees by Department'){
                        console.log('View Employees by Department');
                        startAgain();
                    }
                    else if(`${answers.view}` === 'View Total Utilized Budget'){
                        console.log('View Total Utilized Budget');
                        startAgain();
                    }
                    else{
                        console.log('cancel');
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
}



module.exports = CLI;