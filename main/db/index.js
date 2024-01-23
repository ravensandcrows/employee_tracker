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

  // find all departments
  searchAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }

  // searches for all roles + joins with departments 
  searchAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // search all employees by manager, join with departments and roles to display titles and department names
  searchAllEmployeesByManager(managerID) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerID
    );
  }

  //search for all employees within the department
  searchAllEmployeesByDepartment(departmentID) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentID
    );
  }

  // find all potential managers expect current employee
  searchAllManagers(employeeID) {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeID
    );
  }
  // sums up utilized department budget from all deps
  findDepartmentBudget() {
    return this.connection.promise().query(
      "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    );
  }

  // create a new role
  buildRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  //assign new employee
  newEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }

  // build  department
  buildDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }

  // update the employee's role
  updateRole(employeeID, roleID) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleID, employeeID]
    );
  }

  // Update the given employee's manager
  updateEmManager(employeeID, managerID) {
    return this.connection.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerID, employeeID]
    );
  }

  //Delete
  deleteDepartment(departmentID) {
    return this.connection.promise().query(
      "DELETE FROM department WHERE id = ?",
      departmentID
    );
  }

  deleteRole(roleID) {
    return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleID);
  }

  
  deleteEmployee(employeeID) {
    return this.connection.promise().query(
      "DELETE FROM employee WHERE id = ?",
      employeeID
    );
  }
}

module.exports = new DB(connection);
