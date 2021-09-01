const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

inquirer
  .prompt([
    {
     name: "tracker",
      type: "input",
      message: "What would you like to do?",
     },
    {
      name: "department_id",
      type: "input",
      message: "What is the name of the department?",
    },
    {
      name: "title",
      type: "input",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of the role?",
    },
    {
      name: "department_id",
      type: "input",
      message: "What department does the role belong to?",
    },
    {
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the employee's role?",
    },
    {
      name: "manager_id",
      type: "input",
      message: "Who is the employee's manager?",
    },
    {
      name: "role_update",
      type: "list",
      message: "Which employee's role do you want to update?",
      choices: []
    },
  ])
  .then((answers) => {
    console.info('Answers:', answers);
  })

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tracker_db',
  },
  console.log(`Connected to the tracker_db database.`)
);

app.post('/api/new-department', ({ body }, res) => {
  const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
  const params = [body.department_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

app.get('/api/movies', (req, res) => {
  const sql = `SELECT id, department_name AS title FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});


app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT id, first_name AND last_name AS name FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});


app.put('/api/roles/:id', (req, res) => {
  const sql = `UPDATE roles SET roles = ? WHERE id = ?`;
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});


app.use((req, res) => {
  res.status(404).end();
});
