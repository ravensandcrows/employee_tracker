-- DROP DATABASE IF EXISTS employees;
-- CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_id (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);


-- fk = foriegn key