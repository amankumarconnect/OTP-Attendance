teacher generates otp
stop/start

next
teacher gets list of students who attended class.

schema
user - regNo/facultyID, role, classes
class - classID, className, facultyID, schedule

single model - class

class
    classID
    facultyID
    students
    attendance
        [
            {
                date
                {
                    studentId
                    status
                }
            }
        ]

common page 1 - login

faculty page 1 - input facultyID, csv of studentID
faculty page 2 - classes (input facutltyId to show)
faculty page 3 - class page shows dates and today button
faculty page 4 - date page shows list of students with present/absent status
faculty page 5 - today page shows buttons to start/stop generating attendance

student page 1 - classes (input studentId to show)
student page 2 - date with present/absent status
student page 3 - today page shows option to input otp to mark attendance


Two choices
code generated in frontend and updated in database via api call
code generated in backend, saved to database

code get by api call to database
code get by api call to database

<!-- Next steps -->
1. Add google authentication/authorization
2. Both teacher and students have different pages. So one should not be able to access other. and once someone logs in, they should be redirected to their home page based on role.

<!-- Bugs -->
1. After stop generating, one can still match the code with last generated code - Code is not set to null after stopping