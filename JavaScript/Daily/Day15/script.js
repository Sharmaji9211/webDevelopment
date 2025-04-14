
async function fetchData(){
    try{
        const response = await fetch();
        if(!response.ok){
             throw new Error (`HTTP error ! status : ${response.status}`);
         }
    
    const data = await response.json();
    displayApi(data);
    }
    catch(error){
     console.log(error);
    document.getElementById("newdata").innerText= "Error in Fetching";
    }
    }
    
    function displayApi(users){
    const ele = document.getElementById("newdata");
    ele.innerHTML= "";
    
    users.forEach((user)=>{
    const userContainer = document.createElement("div");
    userContainer.innerHTML= `${user.name} and ${user.email} and ${user.username}`;
});

}
fetchData();