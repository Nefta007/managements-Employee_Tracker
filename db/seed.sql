INSERT INTO department (dep_name)
VALUES
    ("Sales"),
    ("Engineer");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2);
    


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Alex", "Doe", 2, 2);