document.addEventListener("DOMContentLoaded", () => {
    async function fetchData() {
        try {
            let response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            
            const imageData= await response.json();
            displayApi(imageData);
        } catch (error) {
            console.log(error);
            document.getElementById("newdata").innerText = "Error in Fetching";
        }
    }

    function displayApi(users) {
        const ele = document.getElementById("newdata");
        ele.innerHTML = "";

        users.forEach((user) => {
            const userContainer = document.createElement("div");
            userContainer.innerHTML = `<h3>${user.title} - <img src="${user.image}" alt="${user.title}"/></h3>`;
            ele.appendChild(userContainer);
        });
    }

    fetchData();
});
