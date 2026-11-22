//package org.abes.hrmsdatabse.controller;
//
//import org.abes.hrmsdatabse.model.Employee;
//import org.abes.hrmsdatabse.service.EmployeeService;
//import org.springframework.aop.scope.ScopedProxyUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@CrossOrigin("http://localhost:5173/")
//@RequestMapping("/")
//public class EmployeeController {
//    @Autowired
//    private EmployeeService employeeService;
//    @GetMapping("/")
//    public String msg(){
//        return "<h2>Welcome to Sptinboot App development</h2>";
//    }
//
//
//    @RestController
//    public class HomeController {
//
//        @GetMapping("/")
//        public String home() {
//            return "Welcome to Spring Boot App Development";
//        }
//    }
//
//    @PostMapping("/addemp")
//    public String addnewEmployee(@RequestBody Employee emp){
//        System.out.println(emp.getEmail());
//        return  employeeService.createNewEmployee(emp);
//    }
//
//
//    @GetMapping("findbyid/{empid}")
//    public Employee getEmpById(@PathVariable long empid){
//        System.out.println("Employee id:"+empid);
//        return employeeService.getEmployeeById(empid);
//    }
//
//
//}


package org.abes.hrmsdatabse.controller;

import org.abes.hrmsdatabse.model.Employee;
import org.abes.hrmsdatabse.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/v1/user")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/")
    public String msg() {
        return "Welcome to SpringBoot App development";
    }

    @PostMapping("/addemp")
    public String addnewEmployee(@RequestBody Employee emp) {
        return employeeService.createnewEmployee(emp);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam("admission_no") String admissionNo,
            @RequestParam("password") String password) {
        if (admissionNo.isBlank() || password.isBlank()) {
            return ResponseEntity.badRequest().body("Admission number and password are required");
        }

        final long parsedAdmissionNo;
        try {
            parsedAdmissionNo = Long.parseLong(admissionNo);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Admission number must be numeric");
        }

        Employee employee = employeeService.authenticate(parsedAdmissionNo, password);
        if (employee == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid admission number or password");
        }
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/findbyid/{empid}")
    public Employee getEmpById(@PathVariable("empid") long empid) {
        return employeeService.getEmployeeById(empid);
    }

    @DeleteMapping("/deletebyid/{empid}")
    public String deleteById(@PathVariable("empid") long empid) {
        return employeeService.deleteEmployeeById(empid);
    }

    @PutMapping("/updatebyid/{empid}")
    public String updateById(
            @PathVariable("empid") long empid,
            @RequestBody Employee emp) {
        return employeeService.updateEmployeeById(empid, emp);
    }
}