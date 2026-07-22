const path = require('path');

//join path
let joined = path.join("temp","temp2","another_temp")
console.log(joined)

//get path
console.log(path.resolve("another_temp"))

//returns file
let file="A:/Marquee Training/NODE JS/path/temp2"
console.log(path.basename(file));

//get dir name
console.log(path.dirname(file))

//get extension of file
console.log(path.extname("img.jpg"))

//convert path to obj
console.log(path.parse(file));

//converts obj to path
let obj={
    root:'C:/',
    dir:'downloads',
    base:'resume.pdf',
    ext:'pdf',
    name:'resume.pdf'
}

console.log(path.format(obj));

//finds if path is absolute

console.log(path.isAbsolute(file));


