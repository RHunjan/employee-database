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


//view all departments
const allDepartments = function(){
  db.query(`SELECT * FROM departments`, (err, rows) => {
    console.table(rows);
     });
     initialPrompt();
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
    if (err) throw error;
    return;
  });
 };

 //add an employee - first name, last name, role, manager, 
 const addEmployee = function(first, last, role, manager){
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
  const params = [first,last,role,manager];

  db.query(sql, params, (err, result) => { 
    if (err) throw err;
    return;
  
  });
 };

 //prompt for new department
 const newDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Enter new department'
    }

  ]);
 };

 //prompt for new employee
 const newEmployee = () => {
  return inquirer.prompt([
     {
      type: 'input',
      name: 'firstName',
      message: 'Enter employee first name'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter employee last name'
    },
    {
      type: 'input',
      name: 'role',
      message: 'Enter employee role'
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Enter manager id'
    }

  ]);
 };

 //prompt for a new role - title, salary, department
 const newRole = () => {
  return inquirer.prompt([
       {
      type: 'input',
      name: 'title',
      message: 'Enter role title'
    },
      {
      type: 'input',
      name: 'salary',
      message: 'Enter salary'
    },
      {
      type: 'input',
      name: 'department',
      message: 'Enter manager id'
    }

  ]);
 };


 const initialPrompt = ()=> {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee'
            ]
        }
    ]);
};

initialPrompt()
.then(answer => {
  if (answer.choice === 'View all departments'){
      allDepartments();
  } 
  
  if (answer.choice === 'View all roles'){
    allRoles();
  }

  if (answer.choice === 'View all employees'){
    viewEmployees();
  }

  if (answer.choice === 'Add a department'){
    newDepartment()
    .then(answer => {
      addDepartment(answer.department);
     });
  }

  if (answer.choice === 'Add a role'){
    newRole()
    .then(answers => {
      var title = answers.title;
      var salary = answers.salary;
      var department = answers.department;

      addRole(title,salary,department);
    });
  }

  if (answer.choice === 'Add an employee'){
    newEmployee()
    .then(answers => {
      var first = answers.firstName;
      var last = answers.lastName;
      var role = answers.role;
      var manager = answers.manager;

      addEmployee(first, last, role, manager);

      console.log(first, last, role, manager);
    });
  }
  
 
});

 //update employee role - takes in employee id and updates the role


// addEmployee('Reena', 'Hunjan', 3, 2);
// addRole('Something', 89098, 3);
// allDepartments();
// allRoles();
// viewEmployees();
// addDepartment('Marketing');
 
