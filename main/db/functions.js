const connection = require('./connect');
const db = require('../db');

class Queries {
    viewEmployees() {
        db.searchAllEmployees()
            .then(([rows]) => {
                let employees = rows;
                console.log("\n");
                console.table(employees);
            })
    }

    viewDepartments() {
        db.searchAllDepartments()
            .then(([rows]) => {
                let departments = rows;
                console.log("\n");
                console.table(departments);
            })
    }
}
module.exports = new Queries(connection);