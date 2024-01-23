# employee_tracker

## Description

This project utilize SQL databases to view, add, update, and delete and employee and department database. This allows management to check current roles, salary, and employees in one place. You can
also view who reports under who, utilized budget, and other key aspects for employee/department management.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)

## Installation

Download a zip file from this github repo: https://github.com/ravensandcrows/employee_tracker.git

Open up the file in a source-code editor and open in an integrated terminal. Ensure you already have
node.js in your system (https://nodejs.org/en/about).

After that in the integrated terminal write in npm i
followed by npm start. 

## Usage

After starting the command line interface, make your selections to either view, add, delete, update your database. For a detailed walkthrough please refer to this video:

https://drive.google.com/file/d/1P7JrNYbzbuRLYRugNYQ_EdAfppcEt2SS/view

## Credits

https://blog.devart.com/mysql-int-data-type.html#:~:text=What%20is%20UNSIGNED%20INT%20Data%20Type%3F,the%20minimum%20one%20is%200.

https://www.sqlshack.com/understanding-sql-decimal-data-type/

https://www.mysqltutorial.org/mysql-basics/mysql-decimal/

https://www.youtube.com/watch?v=8wSVL_SqPP4

https://github.com/jpd61/employee-tracker

https://www.youtube.com/watch?v=gZugKSoAyoY

https://www.tabnine.com/code/javascript/functions/mysql/createConnection

https://www.youtube.com/watch?v=eIjbSH3Imb8

https://www.w3schools.com/nodejs/nodejs_mysql_select.asp

https://www.simplilearn.com/tutorials/sql-tutorial/sql-update

https://www.w3schools.com/sql/sql_delete.asp

## License

MIT

## Features

View:

View All Departments: Shows you a table of the current departments in your database
View All Roles: Shows all the roles in your database and their associated salary
View All Employees: Shows all the current employees in your database
View Employees by Manager: Shows all the current employees working under a manager
View Employees by Department: Shows all the current employees in a department
View Total Utilized Budget: Shows the current budget within each department

Add: 

Add a Role: Allows you to create a new role with all its associations to be added to the database
Add an Employee: Allows you to add a new employee to the database 
Add a Department: Allows you to create a new department

Update:

Update Employee Role: Update an employees role
Update Employee Managers: Update an employees associated manager

Delete:
Departments: Delete a department and the roles/employees from the database
Roles: Delete a role and associated employees from the database
Employees: Delete a specfic employee

