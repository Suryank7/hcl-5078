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
WHERE student_age BETWEEN 12 AND 18;

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