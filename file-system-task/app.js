const { log } = require("console");
const fs = require("fs");
// fs.mkdirSync("students")
// fs.mkdirSync("archive")

fs.writeFileSync("students/harsh","")
fs.writeFileSync("students/aman","")
fs.writeFileSync("students/deepak","")

const std1=`
Name : Harsh
Course : MERN
Attendance : 90%`

const std2=`
Name : Aman
Course : MERN
Attendance : 80%`

const std3=`
Name : Deepak
Course : MERN
Attendance : 95%
`


fs.appendFileSync("students/harsh",std1)
fs.appendFileSync("students/aman",std2)
fs.appendFileSync("students/deepak",std3)


const s1=fs.readFileSync("students/harsh","utf-8")
const s2=fs.readFileSync("students/aman","utf-8")
const s3=fs.readFileSync("students/deepak","utf-8")

console.log(s1);
console.log(s2);
console.log(s3);


fs.appendFileSync("students/harsh","\nAssignmet Submitted : YES")

fs.renameSync("students/aman","students/aman_kumar")


fs.unlinkSync("students/deepak")


const std4=`
Name : Rohan
Course : JavaScript
Attendance : 55%
`
fs.writeFileSync("students/rohan",std4)

const readme="Old student files will be stored here."

fs.writeFileSync("archive/readme",readme)