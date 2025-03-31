var M = parseInt(prompt("Enter the obtained marks: "));

switch (true) {
    case (M <= 10):
        console.log("E");
        break;
    case (M >= 11 && M <= 20):
        console.log("D");
        break;
    case (M >= 21 && M <= 30):
        console.log("C");
        break;
    case (M >= 31 && M <= 40):
        console.log("B");
        break;
    case (M >= 41 && M <= 50):
        console.log("A");
        break;
    default:
        console.log("Invalid marks");
}


var input = parseInt(prompt("Enter the Charcter"));


if(input==e&& input ==E){
    console.log("Expert Coder");   
}
else if (input == p && input ==P){
    console.log("PrepBytes");   
}
else if (input == d && input == D){
    console.log("Data Structure");   
}
else if (input == z && input == Z){
    console.log("Zenith");   
}
else{
    console.log("invalid charcter"); 
}



 let a = parseInt(prompt("Enter the first number"));
 let b = parseInt(prompt("Enter the second number"));
 let c = parseInt(prompt("Enter the third number"));

 if(a>b && a>c){
       console.log("First number is largest");    
 }
 else if (b>a && c>a ){
    console.log("Second number is largest");  
 }

 else if (c> a&& c>b){
    console.log("Third number is largest");
 }
 else if(a==b&&b==c) {
    console.log("-1");
 }



 let num1 = parseInt(prompt("Enter the first number"));
 let num2 = parseInt(prompt("Enter the second number"));
 let num3 = parseInt(prompt("Enter the third number"));


 if(num1>num2 && num1<num3){
    console.log("First is second smallest number"); 
 }
 if(num2>num1 && num2<num3){
    console.log("Second is second smallest number");
    
 }
 if(num3>num1 && num3<num2){
    console.log("Third  is second smallest number");
    
 }




var A =parseInt(prompt("Enter the Value of A side"));

var B =parseInt(prompt("Enter the Value of B side"));

var C =parseInt(prompt("Enter the Value of C side"));

if((A<90||B<90||C<90)&&A+B+C==180){
    console.log(Acute); 
}
else if(A>90||B>90||C>90)
 {
    console.log("obtuse");
    
}
