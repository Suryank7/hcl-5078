package org.abes.hrmsdatabse.service;

import org.abes.hrmsdatabse.model.Attendance;
import org.abes.hrmsdatabse.repository.AttendanceRepository;
import org.abes.hrmsdatabse.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Attendance> getAttendanceForEmployee(long empId) {
        return attendanceRepository.findByEmployee_EmpIdOrderByAttendancedateDesc(empId);
    }

    public String markAttendance(Attendance attendance) {
        if (attendance.getEmployee() == null) {
            return "Attendance not marked: Employee information missing";
        }

        long empId = attendance.getEmployee().getEmpId();

        if (!employeeRepository.existsById(empId)) {
            return "Attendance not marked: Employee does not exist";
        }

        LocalDate today = LocalDate.now();

        if (attendanceRepository.existsByEmployee_EmpIdAndAttendancedate(empId, today)) {
            return "Attendance already marked for today";
        }

        attendance.setAttendancedate(today);
        attendanceRepository.save(attendance);
        return "Attendance Marked Successfully";
    }
}