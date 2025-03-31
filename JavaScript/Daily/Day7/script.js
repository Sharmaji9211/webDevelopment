const countCharacter= ()=>{
    let s = 'AbaDd';
    let countA =0;
    let countD =0;
    for(let i=0;i<s.length;i++){
        if(s[i]==="A" || s[i]==="a"){
            countA++;
        }
        else if (s[i] ==='D' || s[i]=== "d"){
            countD++;
        }
    }
    return [countA,countD];
};
console.log(countCharacter());

//PATTERN 
for(let i =1 ; i<= 10;i++){
    let pattern = "";
    for(let j =1 ; j<=i;j++){
        pattern += j + " ";
    }
    console.log(pattern);
    
}


//LARGEST NUMBER 
let arr = [ 45,10,52,4,88,44,66,21,45,77];
let largest = arr[0];
for(let i =1 ; i<=arr.length ; i++){
    if(arr[i]>largest){
        largest=arr[i];
    }
}
console.log("this is  largest number: "+largest);


//DUPLICATES
// let arr1 = [4,2,6,5,7,89,4,56,25,45,6,3,88,4,2,6,5,9];
// let duplicate =  [];
// for(let i =0; i<=arr1.length;i++){
//     for(let j =i +1; j<=arr1.length ; j++){
//         if(arr1[i]===arr1[j] && !duplicate.includes(arr1[i])){
//                 duplicate.push(arr1[i]);
//         }
//     }
// }
// console.log(duplicate);


let str = "Hello";
const count= {};

for(let char of str ){
    count [char]= (count [char] || 0)+1;
}

let res = "";
const keys = Object.keys(count).sort();
for(let char of keys){
    if(count[char]>1){
        res += char + count [char];
    }
}
console.log(res);

