const inquirer = require("inquirer");
const cTable = require('console.table');

const db = require('./db/connection');
const { listenerCount } = require("./db/connection");


//view all departments
  const allDepartments = function(){
  db.query(`SELECT * FROM departments`, (err, rows) => {
    console.table(rows);
  });
};
//allDepartments();

 //view all roles
const allRoles = function(){
  db.query(`SELECT * FROM roles`, (err, rows) => {
    console.table(rows);
  });
}
//allRoles();

 //view all employees
const viewEmployees = function(){
  db.query(`SELECT
           employees.id AS ID, employees.first_name AS "First Name", employees.last_name as "Last Name",
           roles.title AS Title, departments.name AS Department, roles.salary AS salary, managers.manager_name AS "Manager Name"
           FROM employees
           LEFT JOIN managers
           ON manager_id = managers.id
           JOIN roles
           ON employees.role_id = roles.id
           JOIN departments 
           ON roles.department_id = departments.id`, (err, rows) =>{
      console.table(rows);
    });
};
// viewEmployees();

//add a department
const addDepartment = function(name){
  const sql = `INSERT INTO departments (name)
  VALUES (?)`;
  const params = name;
  db.query(sql, params, (err, result) => {
    if (err) {
    console.log(err);
  }
  });
 };
//addDepartment('IT');

//Get array of all departments



 //add a role - name of role, salary and department
 const addRole = function(title, salary, department) {
  const sql = `INSERT INTO roles (title, salary, department_id)
  VALUES (?,?,?)`;
  const params = [title, salary, department];
  db.query(sql, params, (err, result) => {
    if (err) throw error;
    return;
  });
 };
 //addRole('CEO', 400000, 1);

//add a role - name, salary, department

const addNewRole = function(){
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, res) => {
    if (err) throw err;

    let deptArray = [];
    res.forEach((dept) => {
      deptArray.push(`${dept.name}`);
    });

    inquirer.prompt([
      {type: 'list',
        name: 'department',
        message: 'please work',
        choices: deptArray


    }
    ]);





  });
};

addNewRole();