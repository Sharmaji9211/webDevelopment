console.log("Welcome DOM");

function change(){
    let ele = document.getElementsByTagName("h1");
    ele[0].innerText = "Hello World";
    ele[0].style.backgroundColor= "red";
    ele[0].style.color= "Blue";

    let ele1= document.getElementById("para");
    ele1.innerHTML="<h1> hello .... </h1>";

    let card= document.getElementsByClassName("cards");
    card[0].style.flexDirection = "column";

    let card1= document.getElementById("card1");
    card1.style.backgroundColor = "red";

    

}