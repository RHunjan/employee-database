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
 viewEmployees();

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

//---------------------------------------------------------------------------------------------------
//add a role - name, salary, department

const addNewRole = function(){
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, res) => {
    if (err) throw err;

    let deptArray = [];
    res.forEach((dept) => {
      deptArray.push(
        {name: `${dept.name}`,
        id: dept.id
                })
    });
  
    let questions = [
      {type: 'input',
       name: 'role',
       message:'Please enter the name of the role',
    },
    {type: 'input',
     name: 'salary',
     message:'Please enter the salary',
    },
    {type: 'list',
     name: 'department',
     message:'Pick the department for the role',
     choices: deptArray
    }
    ];

    inquirer.prompt(questions)
    .then(answers =>{
      let department_id;
      deptArray.forEach(role => {
        if (role.name === answers.department){
            department_id = role.id;
            }
          });
      const sql = `INSERT INTO roles (title, department_id, salary)
      VALUES (?,?,?)`;
      let params = [answers.role, department_id, answers.salary];
       db.query(sql,params, (err, res) =>{
        if (err) throw err;
        console.log(res);
       });
       ;});
     });
};

//addNewRole();
//------------------------------------------------------------------------------------------------------
//add employee - first name, last name, role, manager

const addNewEmployee = function(){
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, res) => {
    if (err) throw err;

    let roleArray = [];
    res.forEach((role) => {
      roleArray.push(
        {name: `${role.title}`,
        id: role.id
                });
    });
    //console.log(roleArray);
    let questions = [
      {type: 'input',
       name: 'firstName',
       message:'Please enter the first name of the employee',
    },
    {type: 'input',
     name: 'lastName',
     message:'Please enter the last name of the employee',
    },
    {type: 'list',
     name: 'role',
     message:'Pick the role',
     choices: roleArray
    }
    ];

    inquirer.prompt(questions)
    .then((answers) => {
      let roleID;
      roleArray.forEach((role) => {
          if (role.name === answers.role){
              roleID = role.id;
              console.log(roleID);
      }
      })
      let empObj = {
        firstName: answers.firstName,
        lastName: answers.lastName,
        role_id: roleID
      }
      return empObj;
        
    }).then((nextRes) => {
      //console.log(nextRes);

      let sql = `SELECT * FROM managers`;
      db.query(sql, (err, res) =>{
         let managerArray = [];
          res.forEach((manager) => {
        managerArray.push(
        {
        name: `${manager.manager_name}`,
        id: manager.id
        });
    });
    //console.log(managerArray);
       // console.log(res);
      inquirer.prompt([
        {type: 'list',
        name: 'manager',
        message: 'Choose a manager',
      choices: managerArray}
      ]).then(answer => {
        console.log(answer);
        let managerID;
        managerArray.forEach((manager)=>{
           if (manager.name === answer.manager){
           managerID = manager.id;
         }

         //console.log(nextRes);
         console.log(managerID);
         let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?,?,?,?)`;
         let params = [nextRes.firstName, nextRes.lastName, nextRes.role_id, managerID];
         db.query(sql, params, (err, result) => {
          if (err) throw err;
          //console.log(result);
        });
        
        });
        //console.log(managerID);
      });




      });
    });

     });
};

//addNewEmployee();