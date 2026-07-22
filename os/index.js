const os=require("os")

console.log("Architecture:"+os.arch());

console.log("Platform:"+os.platform());

console.log("Type:"+os.type())

console.log("Release:"+os.release())

console.log("Version:"+os.version())

const user=os.userInfo()
console.log("User Name:"+user.username)
console.log("User Id:"+user.uid)
console.log("Group Id:"+user.gid)
console.log("User Home Directory:"+user.homedir)

console.log("OS home directory:"+os.homedir)

console.log("Hostname:"+os.hostname);
