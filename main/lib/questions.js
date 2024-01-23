const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What Would Like to do Today?',
        choices: ['View', 'Add', 'Update', 'Delete', 'END']

    },
    {
        type: 'list',
        name: 'view',
        when: function (answers) {
            return answers.options === 'View';
        },
        message: 'Here are all the View Options: ',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 
        'View Employees by Manager', 'View Employees by Department', 
        'View Total Utilized Budget', 'Cancel']
    },
    {
        type: 'list',
        name: 'add',
        when: function (answers){
            return answers.options === 'Add'
        },
        message: 'What would you like to add today?',
        choices: ['Add a Role', 'Add an Employee', 'Add a Department', 'Cancel']
    },
    {
        type: 'list',
        name: 'update',
        when: function (answers){
            return answers.options === 'Update'
        },
        message: 'What would you like to update today?',
        choices: ['Update Employee Role', 'Update Employee Managers', 'Cancel']
    },
    {
        type: 'list',
        name: 'delete',
        when: function (answers){
            return answers.options === 'Delete'
        },
        message: 'What would you like to delete today?',
        choices: ['Departments', 'Roles', 'Employees', 'Cancel']
    },
]

module.exports = questions;