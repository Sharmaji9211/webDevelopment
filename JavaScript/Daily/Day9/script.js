// // let str = "Indian";
// // var count = 0;
// // for(let j = 0; j<= str.length;j++){
// //     if(str[j]=='a' || str[j]== 'e' || str[j]== 'i' || str[j]== 'o' || str[j]== 'u'||
// //         str[j]=='A' || str[j]== 'E' || str[j]== 'I' || str[j]== 'O' || str[j]== 'U'){
// //         count++;
// //     }
// // }
// // console.log("vowel = : "+count);
// // let str1 = "Shivam Sharma";
// // for(let i of str1){
// //     if(i=='a' || i== 'e' || i== 'i' || i== 'o' || i== 'u'||
// //         i=='A' || i== 'E' || i== 'I' || i== 'O' || i== 'U'){
// //         count++;
// //     }
// // }
// // console.log("vowel = : "+count);




// var arr = [4,8,9,7,6];
// var even_num=0;
// var odd_num =0;
// var even=[];
// var odd=[];
// for(let i of arr){
//     if(i%2==0){
//         even.push(i);
//         even_num++;
//     }
//     else{
//         odd.push(i);
//         odd_num++;
//     }
// }
// console.log("Even Number "+even_num);
// console.log(even);
// console.log("Odd Number "+odd_num);
// console.log(odd);

// let arr2 = [1,0,1,0,1,0,1,0,1,1,1,0,1,1];
// let one =0;
// let zero =0;

// for(let i of arr2){
//     if( i===1){
//         one++;
//     }
//     else if (i===0){
//         zero++;
//     }
// }
// console.log(one);
// console.log(zero);


// arr1 = [4,5,8,7,9,8];
// arr2 = [ 4,5,8,7,9,8];
// let result =[];

//       result=(arr1+arr2)
// console.log(result);


// let arr3 = [45, 85, 78, 99, 88, 77, 88, 77, 99, 55, 44, 77, 88, 99];
// let arr4 = [];
// let arr5 =[];
// for (let i = 0; i < arr3.length; i++){
//  if (!arr4.includes(arr3[i])) {
//          arr4.push(arr3[i]);
//     }
//   else{
//        arr5.push(arr3[i]);
//   }  
// }

// console.log("Unique  Array: " +arr4);
// console.log("Duplicate Element : "+arr5);

// let str = "I am developer";
// let words = str.split(" ");
// for (let word of words) {
//      if (word.length > 4) {
//       console.log(word);
//   }
// }



let str2 = "I am developer";
let r = '';
for (let i= 0; i < str2.length; i++) {
    let char = str2[i];
    if (!'aeiouAEIOU'.includes(char)) {
        r = r+char;
    }
}
console.log(r);

result=str2.toUpperCase();
console.log(result);
