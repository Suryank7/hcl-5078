package org.hcl2.aop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.hcl2.aop.entity.Student;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

    @Before("execution(public String org.hcl2.aop.service.StudentService.createStudent()) "){





//    @Before("execution(String org.hcl2.aop.service.StudentService.createStudent())")
//    public void logBeforeMethod(JoinPoint joinPoint) {
//        Object[] args=  joinPoint.getArgs();
//        System.out.println("student is going to be saved");
//    }
//
//    @AfterReturning(value="execution(String org.hcl2.aop.service.StudentService.createStudent())",returning="result")
//    public void logAfterReturningMethod(String result) {
//        System.out.println("logs after returning called"+ result);;
//    }

//    @AfterThrowing(
//            value="execution(* org.hcl2.aop.service.StudentService.createStudent(..))")
//    public void logAfterThrowingMethod() {
//        System.out.println("An Exception Occured");;
//    }
//
//    @After(
//            value="execution(* org.hcl2.aop.service.StudentService.createStudent(..))")
//    public void logAfterMethod() {
//        System.out.println("logAfterMethod executed");;
//    }

//    @Around(
//            value="execution(* org.hcl2.aop.service.StudentService.createStudent(..))")
//    public void logAroundMethod(ProceedingJoinPoint JoinPoint) throws Throwable{
//        System.out.println("Before target Method");;
//        Student student = (Student)JoinPoint.proceed();
//        System.out.println("After target Method");;
//
//        student.setAge(22);
//        student.setName("Amit");
//
//        return student;

    }
}

