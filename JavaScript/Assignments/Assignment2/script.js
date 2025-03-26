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






var A =parseInt(prompt("Enter the Value of A side"));

var B =parseInt(prompt("Enter the Value of B side"));

var C =parseInt(prompt("Enter the Value of C side"));

if(A<90&&B<90&&C<90&&A+B+C==180){
    console.log(Acute); 
}
else if()
{

}
