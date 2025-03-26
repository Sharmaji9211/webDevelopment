//PUSH
const arr1 = ["jarvis", "The"];
let p = arr1.push("Developer"); // push return the length
console.log(p);

//POP

let res4=arr1.pop();
console.log(res4);


//SLICE
let arr = [1, 2, 3, 4, 5];
let newarr = arr.slice(1, 4);
console.log(newarr);

//TO STRING
let res= arr1.toString();
console.log(res);
console.log(res.replaceAll(",", " "));

//SHIFT    reomove first  element and return that element

console.log(arr1.shift());
console.log(arr1);

//UNSHIFT

console.log(arr1.unshift());

//MAP

let arr2=[2,4,5,7,9];
let res1= arr2.map(x=>x*30);
console.log(res1);
 
//FILTER

let person= ["My", "Name", "is", "Shivam", "sharma", "and", "I", "am", "from", "Bareilly"]
let newperson= person.filter(word => word.length > 3);
console.log( newperson);

//FIND
var arr4= [1,2,3,4,5,6,7,8,9]

console.log(arr4.find(x=>x==2));
console.log(arr4.findIndex(x=>x==5));
console.log(arr4.includes(8));

//REVERSE

console.log(arr4.reverse());

//SLICE
var arr5= [1,2,3,4,5,6,7,8,9]
console.log(arr5.splice(1 ,3, 50));
console.log(arr5);












