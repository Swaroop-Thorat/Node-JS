const path=require("path")
const fs=require("fs")
const projectPath=__dirname
let total=0
let obj={
    ".js":0,
    ".css":0,
    ".png":0,
    ".json":0,
    ".md":0,
    ".txt":0
}
let onlyJS=[]

//scan all files
function scanFolder(folder){
   let items=fs.readdirSync(folder)
   for (const file of items) {
    let filePath=path.join(folder,file)
    let stats=fs.statSync(filePath)

    if(stats.isDirectory()){
        scanFolder(filePath)
    }
    else{
        console.log("Original Path:"+filePath);
        console.log("File Name:"+path.basename(filePath));
        console.log("Extension:"+path.extname(file));
        console.log("Directory:"+path.dirname(filePath));
        console.log("IsAbsolute:"+path.isAbsolute(filePath));
        console.log("Parent Folder:"+path.basename(path.dirname(filePath)));
        console.log("Normalized Path:"+path.basename(path.normalize(filePath)));
        console.log();
        
        let ext=path.extname(file);
        if(ext === '.js') onlyJS.push(file)
        if(ext in obj){
        let curr=obj[ext]
        obj[ext]=curr+1;
        }
        total++;
    }
   }
}

scanFolder(projectPath)
console.log("Total Files:"+total);

for (const key in obj) {
    console.log(key+":"+obj[key]);
}
console.log();
console.log("JS Files:");

onlyJS.forEach((ele,idx)=>{
    console.log((idx+1)+":"+ele);
})