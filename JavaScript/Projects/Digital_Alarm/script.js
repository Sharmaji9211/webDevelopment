setInterval(() => {
  showTime();

}, 1000);

function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = hour >= 12 ? "PM" : "AM";

  if (hour > 12) 
     hour -= 12;
  if (hour == 0) 
     hour = 12;

  // let currentTime =  hour + ":" +  min + ":" + sec + am_pm;
  document.getElementById("timeh").innerHTML = hour + "</br>Hour";
  document.getElementById("timem").innerHTML = min + "</br>Minutes";
  document.getElementById("times").innerHTML = sec + "</br>seconds";
  document.getElementById("am").innerHTML = am_pm;

  // document.getElementById("watch").innerHTML = "Time " + currentTime;
  displayGreeting();
}

function displayGreeting() {
  let date = new Date();
  let hours = date.getHours();

  let waketime = document.getElementById("wakeup").value;
  let lunchtime = document.getElementById("lunch").value;
  let naptime = document.getElementById("nap").value;
  let nighttime = document.getElementById("night").value;

  if (parseInt(waketime) === hours) {
    document.getElementById("imgPlaceholder").src = "JavaScript Project Pics/component.svg";

    document.getElementById("message2").innerHTML = "GOOD MORNING! WAKE UP!!";
  } else if (parseInt(lunchtime) === hours) {
    document.getElementById("imgPlaceholder").src =
      "JavaScript Project Pics/food.jpg";
    document.getElementById("message2").innerHTML = "LET'S HAVE SOME LUNCH";
  } else if (parseInt(naptime) === hours) {
    document.getElementById("imgPlaceholder").src =
      "JavaScript Project Pics/Tea.jpg";
    document.getElementById("message2").innerHTML = "GET SOME TEA";
  } else if (parseInt(nighttime) === hours) {
    document.getElementById("imgPlaceholder").src =
      "JavaScript Project Pics/Sleeptime.jpeg";
    document.getElementById("message2").innerHTML = "GO TO BED AND SLEEP";
  }

  displayValue();
}

function displayValue() {
  let wakeValue = document.getElementById("wakeup");
  let lunchValue = document.getElementById("lunch");
  let napValue = document.getElementById("nap");
  let nightValue = document.getElementById("night");

  let value1 = wakeValue.options[wakeValue.selectedIndex].text;
  let value2 = lunchValue.options[lunchValue.selectedIndex].text;
  let value3 = napValue.options[napValue.selectedIndex].text;
  let value4 = nightValue.options[nightValue.selectedIndex].text;

  document.getElementById("nwake").innerHTML = "Wake Up Time: " + value1;
  document.getElementById("nlunch").innerHTML = "Lunch Time: " + value2;
  document.getElementById("nnap").innerHTML = "Nap Time: " + value3;
  document.getElementById("sleep").innerHTML = "Sleep Time: " + value4;
}

