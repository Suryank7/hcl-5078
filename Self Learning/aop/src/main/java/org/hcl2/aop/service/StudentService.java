package org.hcl2.aop.service;

import org.hcl2.aop.entity.Student;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    public Student createStudent(Student student) {
        System.out.println("Student Saved");
        return student;
    }
    public String getStudent(){
        String s = "All Student Data";
        System.out.println(s);
        return s;
//        try {
//            throw new RuntimeException("Exception Occurred");
//        }
//        catch (Exception e){
//            return "student saved";
//        }

    }
}
