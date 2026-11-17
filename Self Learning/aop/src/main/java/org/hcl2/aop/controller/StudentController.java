package org.hcl2.aop.controller;

import org.apache.coyote.Response;
import org.hcl2.aop.entity.Student;
import org.hcl2.aop.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService=studentService;
    }

    @PostMapping
    public ResponseEntity<String>createStudent(@RequestBody Student student){
        Student s = studentService.createStudent(student);
return ResponseEntity.ok(s);
    }

    @GetMapping
    public ResponseEntity<String>getStudent(){
return ResponseEntity.ok(studentService.getStudent();
    }

}
