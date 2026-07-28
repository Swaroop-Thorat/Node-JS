async function greet(){
 const greeting=await fetch("/")

 const res=JSON.stringify(greeting)
 console.log(res);
 
}

greet()