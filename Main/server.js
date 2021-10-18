const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const db = require('./config/connection');

function beginPrompt() {
  inquirer.prompt([{
    type: "list",
    message: "Select one of the following:",
    name: "choice",
    choices: [
      "View all Employees?",
      "Add another Employee?",
      "Update an Employee's Position?",
      "View all Positions?",
      "Add another Position?",
      "View all Departments?",
      "Add another Department?",
      "Exit"
    ]
  }])
  .then(response => {
    switch (response.menu) {
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add another employee':
        addEmployee();
        break;
      case 'Update employee position':
        updateEmployeePosition();
        break;
      case 'View all postions':
        viewAllPositions();
        break;
      case 'Add another position':
        addPosition();
        break;
      case 'View all departments':
        viewDepartments();
        break;
      case 'Add another department':
        addDepartment();
        break;
      case "Exit":
        connection.end();
        break;
      default:
        connection.end();
    }
  });
};