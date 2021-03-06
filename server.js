const inquirer = require('inquirer');
const mysql = require('mysql2');
// const ct = require('console.table');

require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'tracker_db'
});
connection.connect(err => {
  if (err) throw err;
  console.log("Connected to the employee database.");
  employeePrompts();
});

const employeePrompts = () => {
  console.log("employeePrompts running")
  inquirer.prompt({
    type: "list",
    message: "Select one of the following:",
    name: "choice",
    choices: [
      "View all Employees",
      "Add another Employee",
      "Update an Employee Position",
      "View all Positions",
      "Add another Position",
      "View all Departments",
      "Add another Department",
      "Exit"
    ],
  })
  .then(response => {
    console.log("response.choice")
    switch (response.choice) {
      case 'View all Employees"':
        console.log("switchcase view all employees")
        viewAllEmployees();
        break;
      case 'Add another Employee':
        addEmployee();
        break;
      case 'Update an Employee Position':
        updateEmployeePosition();
        break;
      case 'View all Positions':
        viewAllPositions();
        break;
      case 'Add another Position':
        addPosition();
        break;
      case 'View all Departments':
        viewDepartments();
        break;
      case 'Add another Department':
        addDepartment();
        break;
      case "Exit":
        console.log("exit")
        connection.end();
        break;
      default:
        console.log("default")
        viewAllEmployees();
        // connection.end();
    }
  });
};

const viewAllEmployees = () => {
  console.log("view all employees")
  connection.query(
    'SELECT * FROM employee',
    function (err, res) {
      console.log("working?");
      if (err) throw err;
      console.table(res);
      employeePrompts();
    }
  );
};
// viewAllEmployees()
// 'SELECT employee.id, first_name, last_name, title, salary, department_name, manager_id FROM ((department JOIN positions ON department.id = positions.department_id) JOIN employee ON positions.id = employee.position_id);',

const viewAllPositions = () => {
  connection.query('SELECT * FROM positions', function (err, res) {
    if (err) throw err;
    console.table(res);
    employeePrompts();
  });
};
// viewAllPositions()

const viewDepartments = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    employeePrompts();
  });
};
// viewDepartments()
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
        [answer.firstName, answer.lastName, answer.positionId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee added to the database.');
          employeePrompts();
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
        [answer.positionId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Employee position updated in the database.');
          employeePrompts();
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
        name: 'departmentId',
        type: 'input',
        message: 'Department ID number:',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO positions (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.titlePosition, answer.salary, answer.departmentId],
        function (err, res) {
          if (err) throw err;
          console.log('Position added to the database.');
          employeePrompts();
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
        'INSERT INTO department (department_name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log('Department added to the database.');
          employeePrompts();
        }
      );
    });
};