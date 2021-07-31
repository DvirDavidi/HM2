
// A constructor for defining new Assignment
function Assignment(studentName, assignmentName, grade) {
    // some defaults
    this.studentName = studentName;
    this.assignmentName = assignmentName;
    this.grade = grade;
}

// New instances for a few Assignments
const assignment1 = new Assignment("John", "HM1", "");
const assignment2 = new Assignment("Smith", "HM2", "abc");
const assignment3 = new Assignment("Bobi", "Java Script", 100);
const assignment4 = new Assignment("Ben", "Math", 20);
const assignment5 = new Assignment("Asi", "Project", 97);


// Manage all the assigments that were submitted
function GradesChecker(...assignments) {
    this.assignments = assignments;
}

//
GradesChecker.prototype.validate = function () {
    let isValid = true;
    for (let i = 0; i < this.assignments.length; i++) {
        let currentAssignment = this.assignments[i];

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
            isValid = false;
            console.log(`Please Fill a Valid Number in Assignment${i + 1}`);
            this.assignments[i].grade = NaN;
        }
    }
    return isValid;
}


// Prints the generateReport nicely.
GradesChecker.prototype.generateReport = function (generateReport) {
    // Check if the grade value on the assigment is a valid
    printer("Student Name", "Assignment name", "Grade");
    console.log("------------------------------------------------")
    let currentAssignmentReport;

    if (generateReport) {
        for (let i = 0; i < this.assignments.length; i++) {
            currentAssignmentReport = this.assignments[i];
            // Check if all fields on the Assigment instance are populated and
            // if the grade value on the assigment is a valid for a grade.
            if (validValueGrade(currentAssignmentReport) && checkFieldsArePopulated(currentAssignmentReport)) {
                printer(currentAssignmentReport.studentName, currentAssignmentReport.assignmentName, currentAssignmentReport.grade);
            }
        }

    } else {
        for (let i = 0; i < this.assignments.length; i++) {
            // Check if studentName & assignmentName fields on the Assigment instance are populated.
            // Grade field can be NaN.
            currentAssignmentReport = this.assignments[i];
            if (currentAssignmentReport.studentName && currentAssignmentReport.assignmentName) {
                printer(currentAssignmentReport.studentName, currentAssignmentReport.assignmentName, currentAssignmentReport.grade);
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



// New instance for a GradesChecker
let gradeCheker = new GradesChecker(assignment1, assignment2, assignment3, assignment4, assignment5);
let ifValid;

try {
    ifValid = gradeCheker.validate();
    console.log("\n");
    gradeCheker.generateReport(false);
} catch (e) {
    console.log(e);
} finally {
    console.log("\n");
    if (ifValid) {
        console.log(`validation successful`);

    } else {
        console.log(`validation failed`);
    }
}

console.log("\n");
console.log(`Check if gradeCheker instanceof GradesChecker - ${gradeCheker instanceof GradesChecker}`);
