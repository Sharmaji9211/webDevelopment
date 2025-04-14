let str= prompt("Enter the Strin");
let count=0,countc=0;
for(let i of str){
    if(i=='a' || i== 'e' || i== 'i' || i== 'o' || i== 'u'||
        i=='A' || i== 'E' || i== 'I' || i== 'O' || i== 'U'){
        count++;
    }
    else{
        countc++;
    }
}
console.log("vowel = : "+count);
console.log("consonent = : "+countc);



let str1= prompt("Enter the String for the split");
let input=str1.split(" ");

for(let i =0;  i<input.length;i++){
    console.log(
        input[i]
    );
    
}


let str2 = prompt("Enter the string 1");
let str3 = prompt("Enter the string 2");

if(str2===str3){
    console.log("YES"); 
}
else{
    console.log("NO");
    
}

let str4 = prompt("Enter the String")

let s1=str4.split('').reverse().join('');
console.log(s1);

let str5 = prompt("Enter the String1")

let p =  str5.split('').reverse().join('');
if(str5==p){
    console.log(
        "true"
    );
    
}
else{
    console.log("False");
    
}

let str6= prompt("Enter the string ");
let counta=0,countd=0;
for(let i of str6){
    if(i==A){
        counta++;
    }
    else{
        countd++;
    }
}
if(counta>countd){
    console.log("Winner A"); 
}
else if (counta<countd){
    console.log("Winner D");
    
}
else{
    console.log("Match Draw");
    
}


let str7= prompt("Enter the string");
let s= str7.split('');
console.log(s.length);


function concreate(){
    let str8= prompt("Enter the string ");
    let str9= prompt("Enter the string ");
    let str10=str8+str9;
    console.log(str10);
}
concreate();

let str11= prompt("Enter the string ");
function countCharacters(S) {
    let countA = 0;
    let countD = 0;

    for (let i = 0; i < S.length; i++) {
        if (S[i] === 'A') {
            countA++;
        } else if (S[i] === 'D') {
            countD++;
        }
    }

    return [countA, countD];
}
console.log(countCharacters(str11));


let S = "Hi, I am You. You Prepbytes";
let pattern = "You";
let text = "Prepbytes";

S = S.replaceAll(pattern, text);

console.log(S);  