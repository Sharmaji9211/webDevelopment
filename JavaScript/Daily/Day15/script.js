// document.addEventListener("DOMContentLoaded", () => {
    async function fetchData() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            displayApi(data);

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
            userContainer.innerHTML = `<h3>${user.name} - ${user.email} - ${user.username}</h3>`;
            ele.appendChild(userContainer);
        });
    }

    fetchData();
// });
