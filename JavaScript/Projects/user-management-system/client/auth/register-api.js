const rg= document.getElementById('register-form');
// console.log(rg);

rg.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    const p = e.target.password.value;
    const cp = e.target["confirm-password"].value;
    
    console.log("Password:", p);
    console.log("Confirm Password:", cp);
    
    if (cp !== p) {
        alert("Passwords do not match.");
        return;
    }
    
    const formData ={
            "firstname":e.target.fastname.value,
            "lastname":e.target.lastname.value,
            "email":e.target.email.value,
            "password":e.target.password.value
    }
    console.log(formData);

     
    
                fetch("http://localhost:3000/admin-register",
                    {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(formData)
                        
                    }
                ).then ((Response)=>{
                    return Response.json();
                }).then(data=>{
                    console.log(data);
                    if(data){
                        alert("Admin Registered Successfull ");
                    window.location.href='login.html'
                    }else{
                        throw new Error('Something went wrong.');
                    }

                    
                }).catch((error)=>{
                    console.log(error);
                    alert('Registration failed. Please check your credentials.');
                });


    
 });


