
package in.self.crudSpringBootDemo.controller;

import in.self.crudSpringBootDemo.entity.Student;
import in.self.crudSpringBootDemo.service.StudentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Create Student
    @PostMapping("/create")
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {

        Student createdStudent = studentService.createStudent(student);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }

    // Get Student By ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {

        Student studentResp = studentService.getStudent(id);

        if (studentResp == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(studentResp);
    }

    // Get All Students
    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAllStudents() {

        List<Student> studentResp = studentService.getAllStudent();

        if (studentResp.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(studentResp);
    }

    // Update Student
    @PutMapping("/update")
    public ResponseEntity<Student> updateStudent(
            @RequestParam Long id,
            @RequestBody Student student) {

        Student studentResp = studentService.updateStudent(id, student);

        if (studentResp == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(studentResp);
    }

    // Delete Student
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteStudent(@RequestParam Long id) {

        boolean isDeleted = studentService.deleteStudent(id);

        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Record deleted successfully");
    }

    // Soft Delete Student
    @PatchMapping("/delete-soft")
    public ResponseEntity<String> deleteStudentSoftly(@RequestParam Long id) {

        Boolean isDeleted = studentService.deleteStudentSoftly(id);

        if (!isDeleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Record deleted");
    }
}
