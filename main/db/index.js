const connection = require("./connect");

// find all the information in the database so the function.js can parse information for the queries
class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // searches for all employees, and joins important information
  searchAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

    // Find all departments
    searchAllDepartments() {
      return this.connection.promise().query(
        "SELECT department.id, department.name FROM department;"
      );
    }
}

module.exports = new DB(connection);
