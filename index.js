const inquirer = require("inquirer");
const cTable = require('console.table');

const db = require('./db/connection');

// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);


// const initialPromp = ()=> {
//     return inquirer.prompt ([
//         {
//             type: 'list',
//             name: 'choice',
//             message: 'What would you like to do?',
//             choices: [
//                 'View all departments',
//                 'View all roles',
//                 'View all employees',
//                 'Add a department',
//                 'Add a role',
//                 'Add an employee'
//             ]
//         }
//     ]);
// };

//view all departments
const allDepartments = function(){
  db.query(`SELECT * FROM departments`, (err, rows) => {
    console.table(rows);
  });
};

//view all roles
const allRoles = function(){
  db.query(`SELECT * FROM roles`, (err, rows) => {
    console.table(rows);
  });
}

//view all employees
const viewEmployees = function(){
  db.query(`SELECT * FROM employees 
    LEFT JOIN roles ON employees.role_id`, (err, rows) =>{
      console.table(rows);
    });
};

//add a department
const addDepartment = function(name){
  const sql = `INSERT INTO departments (name)
  VALUES (?)`;
  const params = name;
  db.query(sql, params, (err, result) => {
    if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  });
 };

 //add a role - name of role, salary and department
 const addRole = function(title, salary, department) {
  const sql = `INSERT INTO roles (title, salary, department_id)
  VALUES (?,?,?)`;
  const params = [title, salary, department];
  db.query(sql, params, (err, result) => {
    if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  });
 };

 //add an employee - first name, last name, role, manager, 
 const addEmployee = function(first, last, role, manager){
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
  const params = [first,last,role,manager];

  db.query(sql, params, (err, result) => { 
    if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  });
 };

addEmployee('Reena', 'Hunjan', 3, 2);
addRole('Something', 89098, 3);
allDepartments();
allRoles();
viewEmployees();
addDepartment('Marketing');
 
