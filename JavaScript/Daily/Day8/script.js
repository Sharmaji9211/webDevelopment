console.log("shivam");
//Regular Function 
function a (){
    console.log("A");
    
}
a();

//Arrow function
const func = (name)=>{
    console.log("B");
    console.log(name);
}
func("shivam");

//Function expression 
const func2 = function(){
    console.log("C");    
}
func2();


function worning (){
    alert("Please Do the Task")
}
worning();


function num1 (age){
    age = age +5;
    return age;
}

console.log(num1(55));
document.write(num1(50));



























function Lakhu(){
    console.log("Question 1 is completed");
    
}

Lakhu();

const Lakhu1= ()=>{
    console.log("Question 2 is completed");
    
}

Lakhu1();


const Lakhu2 = function(Fname, Lname , age){
        var c = Fname+" " +Lname +" is "+age+" Yeasrs old 2"
       return c;
}

console.log(Lakhu2("Shivam","Sharma",24));



function outer(length , breadth){
    function inner(){
        console.log(length , breadth);
    }
    inner();
}
outer(5,6);