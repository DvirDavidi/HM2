
// A constructor for defining new Assignment
function Assignment(studentName, assignmentName, grade) {
    // some defaults
    this.studentName = studentName;
    this.assignmentName = assignmentName;
    this.grade = grade;
}

// New instances for a few Assignments
const assignment1 = new Assignment("John", "HM1", "44");
const assignment2 = new Assignment("Smith", "HM2", "12d");
const assignment3 = new Assignment("Bobi", "Java Script", 100);
const assignment4 = new Assignment("Ben", "Math", "14");
const assignment5 = new Assignment("Asi", "Project", 97);

/*
TODO: This was meant to be solved using prototype. But i (almost) really like your solution. 
Your solution still offer the same amount of capsulation and shows your understanding of functions. Very good!

BUT - 
It does not allow me to create an instance of GradesChecker.
We have no way of reusing all the functions defined within.
For example, If i want to invoke 'validate' twice(or more) on the same list of assigenments, i will need to invoke GradesChecker twice. I want only to invoke what should look like 'gradesChecker.validate()'

Think of how you can modify this code to make GradesChecker return an instance that exposes some functionallity to the outside

*/

/*TODO: create another version of GradesChecker in a way that will make GradesChecker its own type
For example, if I have a varaiable containing the instance of gradesChecker, i want to be able to invoke 'gradesChecker instanceof GradesChecker' and get 'true'
*/
GradesChecker(assignment1, assignment2, assignment3, assignment4, assignment5);

// Manage all the assigments that were submitted
function GradesChecker(...assignments) {
    let grade;

    // check if all fields on each Assigment instance are populated.
    // if yes, call the generateReport() function.  
    // otherwise, print error message and close app.
    try {
        //TODO: In which scope will 'checkValid' be defined? also, were do we use it and why do we need the return value?
        // TODO: Wouldnt it be better if we only print after successful validation?
        checkValid = validate(); // function could throw exception
        console.log("\n");
        generateReport();
    }
    catch (e) {
        checkValid = false;
        console.log(e); // print Error
    }

    // 
    function validate() {
        let isValid = true; //TODO: think you will change the code if you are only allowed to use 'const' here

        for (let i = 0; i < assignments.length; i++) {
            let currentAssignment = assignments[i];

            // Check if all fields on Assigment instance are populated.
            if (!checkFieldsArePopulated(currentAssignment)) {
                isValid = false;
                throw `Please Fill All Required Field in Assignment${i + 1}`;
            }

            // Check if the grade value on the assigment is a valid for a grade.
            // If the value is a number(OR represents a valid value for a grade), replace with an integer.  
            // Otherwise, converts it to NaN.            
            if (validValueGrade(currentAssignment)) {
                normalize(currentAssignment);

            } else {
                assignments[i].grade = NaN;
                isValid = false;
                console.log(`Please Fill a Valid Number in Assignment${i + 1}`);
            }
        }
        return isValid;
    }

    // Prints the generateReport nicely.
    function generateReport(generateReport = false) {
        printer("Student Name", "Assignment name", "Grade");
        console.log("------------------------------------------------")

        if (generateReport) {
            for (let i = 0; i < assignments.length; i++) {
                // Check if all fields on the Assigment instance are populated and
                // if the grade value on the assigment is a valid for a grade.
                if (validValueGrade(assignments[i]) && checkFieldsArePopulated(assignments[i])) {
                    printer(assignments[i].studentName, assignments[i].assignmentName, assignments[i].grade);
                }
            }

        } else {
            for (let i = 0; i < assignments.length; i++) {
                // Check if studentName & assignmentName fields on the Assigment instance are populated.
                // Grade field can be NaN.
                if (assignments[i].studentName && assignments[i].assignmentName) {
                    printer(assignments[i].studentName, assignments[i].assignmentName, assignments[i].grade);
                }
            }
        }
    }

    function normalize(assignment) {
        assignment.grade = parseInt(grade);
    }

    function checkFieldsArePopulated(assignment) {
        // check all fields if are populated by check Truthy or Falsy value.
        return (assignment.studentName && assignment.assignmentName && assignment.grade);
    }

    function validValueGrade(assignment) {
        grade = assignment.grade;
        return !(isNaN(grade) || grade < 0 || grade > 120 || grade === "" || grade == null);
    }

    /*TODO: 
    Very nice! you can also make printer accept an assigmenment inside of destructring it to seperate arguments. 
    This way, if you'll have more fields, it'll be less changes to the code when you want to print them as well
    See bellow assigmentPrinter 
    */

    //TODO: use template literals(backticks) to build the string: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    function printer(studentName, assignmentName, grade) {
        console.log(
            studentName.padEnd(14) + " | " +
            assignmentName.padEnd(18) + " | " +
            grade.toString().padEnd(8) + " | ");
    }

    function assigmentPrinter(assignment) {
        console.log(
            assignment.studentName.padEnd(14) + " | " +
            assignment.assignmentName.padEnd(18) + " | " +
            assignment.grade.toString().padEnd(8) + " | ");

    }
}