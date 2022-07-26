
INSERT INTO departments (name)
VALUES
    ('Finance'),
    ('Strategy'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Manager', 80000, 1),
    ('Sr. Manager', 100000, 2),
    ('Head', 150000, 3);

INSERT INTO managers(manager_name)
VALUES
    ('Wendy Mancho'),
    ('Dillan Picklers'),
    ('George Tank');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Smith', 1, 1),
    ('Ali', 'Chan', 2, 2),
    ('Jagmeet', 'Patel', 3 , NULL);


