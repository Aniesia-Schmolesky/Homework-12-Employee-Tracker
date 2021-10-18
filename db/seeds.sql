INSERT INTO department (department_name, id)
VALUES ("PTS", 1),
       ("Project Management", 2),
       ("Facilities", 3),
       ("Logistics", 4),
       ("Operation Management", 5);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES ("Sarah", "Smith", 1, 7),
       ("Monica", "Garcia", 2, 7),
       ("Greg", "Nguyen", 3, 7),
       ("Andy", "Miller", 4, 8),
       ("Valerie", "Richards", 5, 8);
       
INSERT INTO positions (title, salary, department_id)
VALUES ("Scientist 1", 75000, 2),
       ("Janitor", 35000, 1),
       ("Lab Assistant", 42000, 2),
       ("LIMS Analyst", 65000, 5),
       ("Data Analyst", 70000, 5);
       
