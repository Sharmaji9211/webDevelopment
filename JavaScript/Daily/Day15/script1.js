document.addEventListener("DOMContentLoaded", () => {
    async function fetchData() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/photos");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            
            const imageData= await response.blob();
            const url = URl
            displayApi(imageData);
        } catch (error) {
            console.log(error);
            document.getElementById("newdata").innerText = "Error in Fetching";
        }
    }

    function displayApi(users) {
        const ele = document.getElementsByTagName("img");
        const ele1 = document.createElement('img');
        ele.src=
        ele.innerHTML = "";

        users.forEach((user) => {
            const userContainer = document.createElement("div");
            userContainer.innerHTML = `<h3>${user.id} - ${user.thumbnailUrl} - ${user.title}</h3>`;
            ele.appendChild(userContainer);
        });
    }

    fetchData();
});
