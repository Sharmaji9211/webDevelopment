
let arr =[15,5,88,99,77,99,22,77,111];
let max = arr[0];
let min=arr[0];
for(let i=0;i<arr.length;i++){
    if(arr[i]>max)
        max=arr[i];
    if(arr[i]<min)
        min=arr[i];

}
console.log(max);
console.log(min);


function IsPass(){
    let arr1= [32,66,55,48,75,45,35,84,75,96,85];
 let size= arr1.length;
 let count =0;
for (const i of arr1) {
    if(i>=32){
        count++;
    }
}
if(count<size){
    console.log("NO");
}
else{
    console.log("YES");
    
}
}
 IsPass();



 let arr2= [32,66,55,48,75,45,35,84,75,96,85];
 let arr3=[];
 for(let i of arr2){
    arr3.push(i=i+1);
 }
 console.log(arr3);
 

 let arr4= [3,6,55,18,15,45,25,4,75,9,85];
 let arr5=[];
 for(let i of arr4){
    if(i>=18)
    arr5.push(i);
 }

 console.log(arr5);
 

 
 let arr6= [3,6,55,18,15,45,25,4,75,9,85];
 let key1 = 97;

 function keyFind(arr ,key1 ){
    for (const i of arr6) {
        if(i==key1)
           return console.log("YES");     
     }
     return console.log("NO");
     
 }

 keyFind(arr6,key1);


 let arr7 = [3,6,55,18,15,45,25,4,75,9,85];
 
function even_Odd(arr){
    let odd= 0;
    let even = 0;

    for(let i of arr ){
        if(i%2==0){
            even = even+i;
        }
        else{
            odd =odd+i;
        }
    }
    console.log("sum of even = "+even);
    console.log("sum of odd = "+odd);  
}

even_Odd(arr7);

let array = [1,2,3,4,5]
function product(arr){
    let pro = 1;
    for (const i of arr) {
          pro=i*pro;
    }
    console.log(pro);
    
}
product(array);



let array1 = [1,2,3,4,5]
function sum(arr){
    let sum = 0;
    for (const i of arr) {
          sum=i+sum;
    }
    console.log(sum);
    
}
sum(array)

let arrays= [5,6,8,7,8,9,2];
 let key = 8;
 let count = 0;
 for(let i of arrays){
    if(i===key){
        count++;
    }
 }
  console.log(count);
  

function uniqueShirts(N, colors) {
    let freq = {};

    for (let i = 0; i < N; i++) {
        let color = colors[i];
        if (freq[color]) {
            freq[color]++;
        } else {
            freq[color] = 1;
        }
    }

    let count = 0;
    for (let key in freq) {
        if (freq[key] === 1) {
            count++;
        }
    }

    return count;
}


let N = 6;
let colors = [3, 2, 4, 1, 2, 3];
console.log(uniqueShirts(N, colors)); 
