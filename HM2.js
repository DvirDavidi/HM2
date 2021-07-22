
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

GradesChecker(assignment1, assignment2, assignment3, assignment4, assignment5);

// Manage all the assigments that were submitted
function GradesChecker(...assignments) {
    let grade;

    // check if all fields on each Assigment instance are populated.
    // if yes, call the generateReport() function.  
    // otherwise, print error message and close app.
    try { 
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
        let isValid = true;

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

    function printer(studentName, assignmentName, grade) {
        console.log(
            studentName.padEnd(14) + " | " +
            assignmentName.padEnd(18) + " | " +
            grade.toString().padEnd(8) + " | ");
    }
}