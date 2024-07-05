class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Student extends Person {
    rollnumber;
    courses = [];
    constructor(name, age, rollnumber) {
        super(name, age);
        this.rollnumber = rollnumber;
    }
    registerForCourses(course) {
        this.courses.push(course);
    }
}
class Instructor extends Person {
    salary;
    courses = [];
    constructor(name, age, salary) {
        super(name, age);
        this.salary = salary;
    }
    assignCource(course) {
        this.courses.push(course);
    }
}
class Course {
    id;
    name;
    students = [];
    instructors = [];
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    addstudent(std) {
        this.students.push(std);
        std.registerForCourses(this);
    }
    setInstructor(instructor) {
        this.instructors.push(instructor);
    }
}
class Departmet {
    name;
    courses = [];
    constructor(name) {
        this.name = name;
    }
    addcourse(course) {
        this.courses.push(course);
    }
}
const std1 = new Student("hamzah", 22, "123");
const std2 = new Student("Ali", 22, "1342");
const instructor1 = new Instructor("abc", 30, 10000);
const instructor2 = new Instructor("abc", 22, 50000);
const course1 = new Course(1, "blockchain");
const course2 = new Course(1, "metaervse");
course1.addstudent(std1);
course1.addstudent(std2);
course2.addstudent(std1);
course1.setInstructor(instructor1);
course2.setInstructor(instructor2);
console.log(course1.students);
const d1 = new Departmet("Computer Science");
d1.addcourse(course1);
console.log(d1.courses[0]);
console.log(course1.students);
console.log(std1.courses);
export {};
