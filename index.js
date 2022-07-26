const inquirer = require("inquirer");
const cTable = require('console.table');

const db = require('./db/connection');

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
           roles.title AS Title, departments.name AS Department, roles.salary AS salary
           FROM employees
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
 //addRole('CEO', 400000, 1);

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
//addEmployee('Tootsie', 'Roll', 1, 1);
 
 //updates an employee role - select an employee and update their role and update the db

//  //Create list of all employees
//  const employeeList = function(){

//   db.query(`SELECT * FROM employees`, (err, rows) => {
//     console.log(rows);
//   });


//  employeeList();

 //}; //end employeeList




//  const updateEmployee = function(){

//   db.query(`SELECT employees.first_name, employees.last_name, employees.id, employees.role_id, roles.title, roles.id FROM employees
//   LEFT JOIN roles ON employees.role_id = roles.id`, (err, response) =>{
//   if (err) throw err;

//   console.log(response);
//   const empArray = response.map(({first_name, last_name, id}) => (
//     { name: `${first_name} ${last_name} ID: ${id}`,
//       value: id
//     }));
//    //console.log(empArray);

//     const roleArray = response.map(({title}) => (
// //       {title: `${title}`
//       }) );

//     let uniqueRoles = [...new Set(roleArray)];
//    console.log(uniqueRoles);

 



//      inquirer.prompt([
//     {
//       type: 'list',
//       name: 'employees',
//       message: 'choose employee to update',
//       choices: empArray
//     },
//     {
//       type: 'list',
//       name: 'roles',
//       message: 'choose role to update',
//       choices:uniqueRoles
//     }
//   ]);
//   });   
    


   

   

//  };

// updateEmployee(); 


//  //prompt for new department
//  const newDepartment = () => {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'department',
//       message: 'Enter new department'
//     }
//   ]);
//  };

//  //prompt for new employee
//  const newEmployee = () => {
//   return inquirer.prompt([
//      {
//       type: 'input',
//       name: 'firstName',
//       message: 'Enter employee first name'
//     },
//     {
//       type: 'input',
//       name: 'lastName',
//       message: 'Enter employee last name'
//     },
//     {
//       type: 'input',
//       name: 'role',
//       message: 'Enter employee role'
//     },
//     {
//       type: 'input',
//       name: 'manager',
//       message: 'Enter manager id'
//     }
//   ]);
//  };

//  //prompt for a new role - title, salary, department
//  const newRole = () => {
//   return inquirer.prompt([
//        {
//       type: 'input',
//       name: 'title',
//       message: 'Enter role title'
//     },
//       {
//       type: 'input',
//       name: 'salary',
//       message: 'Enter salary'
//     },
//       {
//       type: 'input',
//       name: 'department',
//       message: 'Enter manager id'
//     }

//   ]);
//  };

// //initial prompt
//  const initialPrompt = ()=> {
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

// // //initialPrompt()
// // .then(answer => {
// //   if (answer.choice === 'View all departments'){
// //       allDepartments();
// //   } 
  
// //   if (answer.choice === 'View all roles'){
// //     allRoles();
// //   }

// //   if (answer.choice === 'View all employees'){
// //     viewEmployees();
// //   }

// //   if (answer.choice === 'Add a department'){
// //     newDepartment()
// //     .then(answer => {
// //       addDepartment(answer.department);
// //      });
// //   }

// //   if (answer.choice === 'Add a role'){
// //     newRole()
// //     .then(answers => {
// //       var title = answers.title;
// //       var salary = answers.salary;
// //       var department = answers.department;

// //       addRole(title,salary,department);
// //     });
// //   }

// //   if (answer.choice === 'Add an employee'){
// //     newEmployee()
// //     .then(answers => {
// //       var first = answers.firstName;
// //       var last = answers.lastName;
// //       var role = answers.role;
// //       var manager = answers.manager;
// //       addEmployee(first, last, role, manager);
// //     });
// //   }
  
 
// });


