package org.abes.hrmsdatabse.controller;

import org.abes.hrmsdatabse.model.Attendance;
import org.abes.hrmsdatabse.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("v1/user/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/by-employee/{empId}")
    public List<Attendance> getAttendanceForEmployee(@PathVariable long empId) {
        return attendanceService.getAttendanceForEmployee(empId);
    }

    @PostMapping("/markattendance")
    public String markAttendance(@RequestBody Attendance attendance){
        System.out.println(attendance.getInTime());
        return attendanceService.markAttendance(attendance);
    }

}



//package org.abes.hrmsdatabse.controller;
//
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/v1/user/attendance")
//public class AttendanceController {
//
//    @PostMapping("/markattendance")
//    public string markattnedance(@RequestBody Attendance attendance){
//       return attendanceService.markAttendance(attendance);
//
//    }
//}
