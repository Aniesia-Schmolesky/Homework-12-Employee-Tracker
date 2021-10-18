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

const viewAllEmployees = () => {
  connection.query(
    'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN roles ON department.id = roles.department_id) JOIN employee ON roles.id = employee.role_id);',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      employeeMenu();
    }
  );
};

const viewAllPositions = () => {
  connection.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    console.table(res);
    employeeMenu();
  });
};

const viewDepartments = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    employeeMenu();
  });
};

const addEmployee = () => {
  inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: "Employee's first name:",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "Employee's last name:",
      },
      {
        name: 'positionId',
        type: 'input',
        message: "Employee's position id:",
      },
      {
        name: 'managerId',
        type: 'input',
        message: "Manager's Id:",
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log(chalk.blue.bgRed.bold('Employee added to the database.'));
          employeeMenu();
        }
      );
    });
};
const updateEmployeePosition = () => {
  inquirer.prompt([{
        name: 'id',
        type: 'input',
        message: 'Employee id:',
      },
      {
        name: 'positionId',
        type: 'input',
        message: 'Position id:',
      },
    ])
    .then(answer => {
      connection.query(
        'UPDATE employee SET position_id=? WHERE id=?',
        [answer.roleId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log(chalk.blue.bgRed.bold('Employee position updated in the database.'));
          employeeMenu();
        }
      );
    });
};

const addPosition = () => {
  inquirer.prompt([{
        name: 'titlePosition',
        type: 'input',
        message: 'Title of position:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Position salary:',
      },
      {
        name: 'deptId',
        type: 'input',
        message: 'Department ID number:',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.titlePosition, answer.salary, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.log(chalk.blue.bgRed.bold('Position added to the database.'));
          employeeMenu();
        }
      );
    });
};
const addDepartment = () => {
  inquirer.prompt([{
      name: 'department',
      type: 'input',
      message: 'Name of department:',
    }, ])
    .then(answer => {
      connection.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log(chalk.blue.bgRed.bold('Department added to the database.'));
          employeeMenu();
        }
      );
    });
};