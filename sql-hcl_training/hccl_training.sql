CREATE DATABASE school_db;
USE school_db;

-- DDL TASK 1: CREATE THE STRUCTURE
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(50) NOT NULL,
    student_email VARCHAR(100) UNIQUE,
    student_age INT CHECK (student_age >= 5),
    student_city VARCHAR(100) DEFAULT 'Delhi',
    student_admission_date DATE,
    CHECK (student_name <> '')
);

-- DDL TASK 2: MODIFY THE STRUCTURE
CREATE TABLE marks (
    mark_id INT PRIMARY KEY,
    student_id INT,
    subject_ VARCHAR(30),
    score_ INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

ALTER TABLE students ADD phone_no INT;
ALTER TABLE students MODIFY phone_no VARCHAR(15);
ALTER TABLE students RENAME COLUMN student_city TO student_hometown;
ALTER TABLE students ADD INDEX idx_students_name (student_name);

CREATE TABLE students_backup LIKE students;
DROP TABLE students_backup;

-- DML TASK 1: INSERT DATA
INSERT INTO students
    (student_name, student_email, student_age, student_hometown, student_admission_date)
VALUES
    ('Rahul Sharma', 'rahul@example.com', 20, 'Delhi', '2024-07-15');

INSERT INTO students
    (student_name, student_email, student_age, student_hometown, student_admission_date)
VALUES
    ('Priya Singh', 'priya@example.com', 14, 'Mumbai', '2024-07-20'),
    ('Amit Kumar', 'amit@example.com', 13, 'Lucknow', '2024-08-01'),
    ('Anjali Verma', 'anjali@example.com', 15, 'Delhi', '2024-08-05'),
    ('Mohit Sharma', 'mohit@example.com', 12, 'Noida', '2024-08-06'),
    ('Asha Gupta', 'asha@example.com', 11, 'Noida', '2024-08-07');

INSERT INTO marks (mark_id, student_id, subject_, score_)
VALUES
    (1, 1, 'Maths', 85),
    (2, 1, 'Science', 90),
    (3, 2, 'English', 78),
    (4, 2, 'Maths', 88),
    (5, 3, 'Science', 92),
    (6, 3, 'English', 95),
    (7, 4, 'Maths', 70),
    (8, 4, 'Science', 75),
    (9, 5, 'English', 82),
    (10, 5, 'Maths', 60),
    (11, 6, 'Science', 18),
    (12, 6, 'English', 90);

SELECT * FROM students;
SELECT * FROM marks;


-- DML TASK 2: UPDATE AND DELETE
UPDATE marks
SET score_ = score_ + 5
WHERE subject_ = 'Maths';

UPDATE students
SET student_hometown = 'Noida'
WHERE student_id = 2;

UPDATE students
SET student_age = student_age + 1
WHERE student_hometown = 'Delhi';


DELETE FROM marks
WHERE score_ < 20;

SELECT * FROM students;
SELECT * FROM marks;

-- DQL TASK 1: FILTERING AND SORTING
SELECT * FROM students;

SELECT student_name AS 'Student Name', student_hometown
FROM students;

SELECT *
FROM students
WHERE student_age BETWEEN 10 AND 15;

SELECT *
FROM students
WHERE student_name LIKE 'A%';

SELECT *
FROM students
WHERE student_hometown IN ('Delhi', 'Noida')
ORDER BY student_age DESC;

SELECT *
FROM students
ORDER BY student_age DESC
LIMIT 3;

SELECT DISTINCT student_hometown
FROM students;

-- DQL TASK 2: AGGREGATES AND JOINS
SELECT student_hometown, COUNT(*) AS total_students
FROM students
GROUP BY student_hometown;

SELECT
    subject_,
    AVG(score_) AS average_score,
    MAX(score_) AS highest_score,
    MIN(score_) AS lowest_score
FROM marks
GROUP BY subject_;

SELECT subject_, AVG(score_) AS average_score
FROM marks
GROUP BY subject_
HAVING AVG(score_) > 60;

SELECT students.student_name, marks.subject_, marks.score_
FROM students
INNER JOIN marks
ON students.student_id = marks.student_id;

SELECT students.student_name, marks.subject_, marks.score_
FROM students
LEFT JOIN marks
ON students.student_id = marks.student_id;

SELECT students.student_name, marks.subject_, marks.score_
FROM students
INNER JOIN marks
ON students.student_id = marks.student_id
WHERE marks.score_ > (SELECT AVG(score_) FROM marks);

SELECT student_id, student_name, total_marks,
       RANK() OVER (ORDER BY total_marks DESC) AS student_rank
FROM (
    SELECT students.student_id, students.student_name,
           SUM(marks.score_) AS total_marks
    FROM students
    INNER JOIN marks
    ON students.student_id = marks.student_id
    GROUP BY students.student_id, students.student_name
) AS student_totals;

-- TCL TASK 1: COMMIT AND ROLLBACK
SET autocommit = 0;

START TRANSACTION;

UPDATE marks
SET score_ = 100
WHERE mark_id = 1;

SELECT * FROM marks WHERE mark_id = 1;

ROLLBACK;

SELECT * FROM marks WHERE mark_id = 1;

START TRANSACTION;

UPDATE marks
SET score_ = 100
WHERE mark_id = 1;

SELECT * FROM marks WHERE mark_id = 1;

COMMIT;

SELECT * FROM marks WHERE mark_id = 1;

-- TCL TASK 2: SAVEPOINTS
START TRANSACTION;

INSERT INTO students
    (student_name, student_email, student_age, student_hometown)
VALUES
    ('Temporary One', 'temp1@gmail.com', 18, 'Delhi');

SAVEPOINT s1;

INSERT INTO students
    (student_name, student_email, student_age, student_hometown)
VALUES
    ('Temporary Two', 'temp2@gmail.com', 19, 'Noida');

SAVEPOINT s2;

DELETE FROM marks
WHERE mark_id = 3;

ROLLBACK TO SAVEPOINT s2;

SELECT * FROM marks WHERE mark_id = 3;
SELECT * FROM students WHERE student_email IN ('temp1@gmail.com', 'temp2@gmail.com');

ROLLBACK TO SAVEPOINT s1;

SELECT * FROM students WHERE student_email IN ('temp1@gmail.com', 'temp2@gmail.com');
SELECT * FROM marks WHERE mark_id = 3;

COMMIT;
SET autocommit = 1;

-- DCL TASK 1: CREATE USER AND GRANT ACCESS
CREATE USER 'teacher1'@'localhost' IDENTIFIED BY 'Teacher@123';

GRANT SELECT, INSERT, UPDATE
ON school_db.marks
TO 'teacher1'@'localhost';

SHOW GRANTS FOR 'teacher1'@'localhost';

-- DCL TASK 2: REVOKE AND ROLES
REVOKE UPDATE
ON school_db.marks
FROM 'teacher1'@'localhost';

CREATE ROLE 'viewer';

GRANT SELECT
ON school_db.*
TO 'viewer';

CREATE USER 'guest1'@'localhost' IDENTIFIED BY 'Guest@123';

GRANT 'viewer' TO 'guest1'@'localhost';
SET DEFAULT ROLE 'viewer' TO 'guest1'@'localhost';

SHOW GRANTS FOR 'guest1'@'localhost';
SHOW GRANTS FOR 'guest1'@'localhost' USING 'viewer';

DROP USER 'teacher1'@'localhost';
DROP USER 'guest1'@'localhost';

-- DATA TYPES TASK 1: CREATE LIBRARY_BOOKS TABLE
CREATE TABLE library_books (
    book_title VARCHAR(255),
    isbn CHAR(13),
    price DECIMAL(10,2),
    copies INT,
    available BOOLEAN,
    category ENUM('Fiction', 'Science', 'History'),
    published_year YEAR,
    description LONGTEXT
);

-- CONSTRAINTS TASK 2: CREATE TEACHERS TABLE
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) CHECK (salary > 0),
    joining_date DATE DEFAULT (CURRENT_DATE)
);

INSERT INTO teachers (email, name, salary)
VALUES ('teacher@gmail.com', 'Ravi', 45000);
