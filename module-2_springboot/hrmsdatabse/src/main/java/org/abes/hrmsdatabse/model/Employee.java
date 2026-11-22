
package org.abes.hrmsdatabse.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Transient;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @Column(name = "emp_id")
    private long empId;

    @Column(name = "emp_name")
    private String empName;

    private String stack;
    private String designation;

    @JsonIgnore
    @Column(name = "password_hash")
    private String passwordHash;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public Employee() {
    }

    public Employee(long empId, String empName,
                    String stack, String designation) {
        this.empId = empId;
        this.empName = empName;
        this.stack = stack;
        this.designation = designation;
    }

    public long getEmpId() {
        return empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getStack() {
        return stack;
    }

    public void setStack(String stack) {
        this.stack = stack;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}


//package org.abes.hrmsdatabse.model;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//
//@Entity
//public class Employee {
//    @Id
//    @Column(name = "empid")
//    private long empId;
//    private String empName;
//    private String designation;
//    private String stack;
//    private String email;
//    private String password;
//
//    // Default Constructor (Required by JPA)
//    public Employee() {
//    }
//
//    // Parameterized Constructor
//    public Employee(long empId, String empName, String designation, String stack, String email, String password) {
//        this.empId = empId;
//        this.empName = empName;
//        this.designation = designation;
//        this.stack = stack;
//        this.email = email;
//        this.password = password;
//    }
//
//    // Getters and Setters
//    public long getEmpId() {
//        return empId;
//    }
//
//    public void setEmpId(long empId) {
//        this.empId = empId;
//    }
//
//    public String getEmpName() {
//        return empName;
//    }
//
//    public void setEmpName(String empName) {
//        this.empName = empName;
//    }
//
//    public String getDesignation() {
//        return designation;
//    }
//
//    public void setDesignation(String designation) {
//        this.designation = designation;
//    }
//
//    public String getStack() {
//        return stack;
//    }
//
//    public void setStack(String stack) {
//        this.stack = stack;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//}
