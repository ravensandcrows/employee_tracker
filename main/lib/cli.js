const inquirer = require('inquirer');
const questions = require('./questions');

class CLI{
    run(){
        inquirer
        .prompt(questions)
        .then(answers=>{
            switch(`${answers.options}`){
                case 'View':
                    if(`${answers.view}` === 'View All Departments'){
                        console.log('View All Departments');
                    }
                    else if(`${answers.view}` === 'View All Roles'){
                        console.log('View All Roles');
                    }
                    else if(`${answers.view}` === 'View Employees by Manager'){
                        console.log('View Employees by Manager');
                    }
                    else if(`${answers.view}` === 'View Employees by Department'){
                        console.log('View Employees by Department');
                    }
                    else if(`${answers.view}` === 'View Total Utilized Budget'){
                        console.log('View Total Utilized Budget');
                    }
                    else{
                        console.log('cancel');
                    }
                    break;
                case 'Add':
                    if(`${answers.add}` ==='Add a Role'){ 
                        console.log('Add a Role');
                    }
                    else if(`${answers.add}` === 'Add an Employee'){
                        console.log('Add an Employee');
                    }
                    else{
                        console.log('cancel');
                    }
                    break;
                case 'Update':
                    if(`${answers.update}` === 'Update Employee Role'){ 
                        console.log('Update Employee Role');
                    }
                    else if(`${answers.update}` === 'Update Employee Managers'){
                        console.log('Update Employee Managers');
                    }
                    else{
                        console.log('cancel');
                    }
                    break;
                case 'Delete':
                    if(`${answers.delete}` === 'Departments'){ 
                        console.log('Remove Department');
                    }
                    else if(`${answers.delete}` ==='Roles'){
                        console.log('Remove Roles');
                    }
                    else if(`${answers.delete}` ==='Employees'){
                        console.log('Terminate Employee')
                    }
                    else{
                        console.log('cancel');
                    }
                    break;
            }
        });
    }
}

module.exports = CLI;