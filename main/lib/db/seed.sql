use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Marketing'),
    ('Human Resources'),
    ('IT'),
    ('Cyber Security');
  

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
    ('Marketing Manager', 100000, 5),
    ('Graphic Designer', 70000, 5),
    ('Lead Technical Recruiter', 130000, 6),
    ('Jr. Recruiter', 80000, 6),
    ('Lead Data Scientist', 250000, 7),
    ('Jr. Data Scientist', 90000, 7),
    ('Lead Information Security Analyst', 190000, 8),
    ('Jr. Information Security Analyst', 100000, 8);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Martin', 'Guzman', 1, NULL),
    ('Hyesok', 'Na', 2, 1),
    ('Rosario', 'Castellanos', 3, NULL),
    ('Ivan', 'Turgenev', 4, 3),
    ('Yun', 'Choe', 5, NULL),
    ('Zora', 'Hurston', 6, 5),
    ('Harper', 'Lee', 7, NULL),
    ('Jean-Dominique', 'Bauby', 8, 7),
    ('Haruki', 'Murakami', 9, NULL),
    ('Jean', 'Coulthard', 10, 9),
    ('William', 'Blake', 11, NULL),
    ('Eileen', 'Chang', 12, 11),
    ('Herman', 'Hesse', 13, NULL),
    ('Osamu', 'Dazai', 14, 13),
    ('Ursula', 'Guin', 15, NULL),
    ('Robert', 'Frost', 16, 15);

