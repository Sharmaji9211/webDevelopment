let obj ={

    name: "Shiavm",
    age :  24,
    Address: "Bareilly"
}

console.log(obj.age);

var user= {
    name: "Rahul",
    profession: "Teacher",
    hobbies: ["Reading", "Dancing"]
}

console.log(user.hobbies);

var shivam= {
    name: "Rahul",
    profession: "Teacher",
    hobbies: ["Reading", "Dancing"],
    bio: function() {
        console.log(`Hi! I am ${this.name}, my profession is
       ${this.profession}`)
    }
}

console.log(shivam.bio());



function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  
  const car1 = new Car('Eagle', 'Talon TSi', 1993);
  console.log(car1);
  const car2 = new Car('TATA', 'i10', 2009);
  console.log(car2);
  
  

  class Rectangle {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  }
  
  const square = new Rectangle(10,10);
  console.log(square);
  
  