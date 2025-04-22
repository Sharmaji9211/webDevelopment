function Person(Name, age) {
    this.Name = Name;
    this.age = age; 
  } 
  const person1 = new Person('Shivam', 30);
  console.log(person1); 
  

class Person3 {
    constructor(Name, age) {
      this.Name = Name;
      this.age = age;
    }
  } 
  const person2 = new Person3('Deepak', 25);
  console.log(person2); 
  

//   spread operator

// 1. use in string 
let str = "Shivam";
console.log(...str);

// 2. use in object  we are multiple object call in  another object with the help 

const body ={
    height: 174,
    width: 64
}
const brain = {
    iq : 1
}
const persons = {
    ...body,
    ...brain,
    name: 'shivam',
};
console.log(persons);


const info1 =  {
    id1 :1,
    name1:"shivam",
    age1:22
}
const info2 =  {
    id2 :2,
    name2:"Deepak",
    age2:25
}
const info3 =  {
    id3 :3,
    name3:"Rishabh",
    age3:28
}

const AllEmp ={
     ...info1,
     ...info2,
     ...info3,
     adddress : "Bareilly"
}

console.log(AllEmp);




// First class function 

const foo =function (){
    console.log("This is  first class fuction because a variable hold the function and that function function expression");
    
}
foo();

// function pass as a arguments an other function and return anohter function
const foo1 =function (){
    return function(){
    console.log(" Higherorder function");
    }
}

foo1()();


function test(){
    var name = 'Shivam sharma';
    function showName(){
        console.log(name)
    }
    showName();
}
test();