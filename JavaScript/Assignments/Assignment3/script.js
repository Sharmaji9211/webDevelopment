
for(let i =1; i<= 5; i++){
    for(let j =1; j<=i; j++){
        console.log("*");
    }
      console.log("\n");    
}



for(var number=1; number<=45 ;number++){
    if(number%3==0){
        console.log("Fizz");
    }
    else  if(number%5==0){
        console.log("Buzz");
    }
    else  if(number%5==0 & number%3==0){
        console.log("FizzBuzz");
    }
}


var numbersArray = [1,13,22,123,49];
var sum=numbersArray[0];
for(let i=1 ; i<numbersArray.length;i++){
    sum= sum +numbersArray[i];
}
console.log(sum);

let arr_1 = [3, 5, 22, 5, 7, 2, 45, 75, 89, 21, 2]; 
let arr_2 = [9, 2, 42, 55, 71, 22, 4, 5, 90, 25, 26];

let sum1 = arr_1[0];
let sum2 = arr_2[0];

for (let i = 1; i < arr_1.length; i++) {
    sum1 += arr_1[i];
}
for (let j = 1; j < arr_2.length; j++) {
    sum2 += arr_2[j];
}

let Total_sum = sum1 + sum2;
console.log(Total_sum);


let arr = [43, "what", 9, true, "cannot", false, "be", 3, true];

for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}
