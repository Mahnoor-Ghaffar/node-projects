#! /usr/bin/env node
import inquirer from "inquirer";
//Defining student class
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    //Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //View a student balance
    view_balance() {
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }
    //method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`);
        console.log(`Remaning Balance : $${this.balance}`);
    }
    //Method to display student status
    show_status() {
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Course : ${this.courses}`);
        console.log(`Balance : ${this.balance}`);
    }
}
//Define a studet manager class to mannage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student : ${name} added successfully. Student ID : ${student.id}`);
    }
    //Method to enroll student in a course 
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    //Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found.Please enter a correct student ID");
        }
    }
    //Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    //Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //Method to find a student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log("Welcome to 'Mahnoor's'- Student managment system");
    console.log("-".repeat(50));
    let student_manager = new Student_manager();
    //while loop to keep program runnig
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View student balance",
                    "Pay Fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);
        //using Switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                student_manager.pay_student_fees(fee_input.student_id, fee_input.amount);
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exitig...");
                process.exit();
        }
    }
}
//Calling a function
main();
