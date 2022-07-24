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

const allDepartments = function(){
  db.query(`SELECT * FROM departments`, (err, rows) => {
    console.table(rows);
  });
};

const allRoles = function(){
  db.query(`SELECT * FROM role`, (err, rows) => {
    console.table(rows);
  });
}


 
allDepartments();
allRoles();
 
