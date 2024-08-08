let cookies = {};

// Buttons for adding something
const addCarBtn = document.getElementById("add-car");
const updateCarBtn = document.getElementById("update-car");
const addUserBtn = document.getElementById("add-user");

$(".popup__form-btn").on("click", (event) => {
    event.preventDefault();
});

// Remove cookies after clicking logout button
$(".aside__logout-link").on("click", () => {
    for (let cookie in cookies) {
        document.cookie =
            cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
});

// Create object from cookies
document.cookie.split(";").forEach(function (cookieItem) {
    try {
        cookies[cookieItem.split("=")[0].trim()] = cookieItem
            .split("=")[1]
            .trim();
    } catch {
        console.log("Cookie error");
    }
});

/*
TODO:
1. Create function for add cars
2. Create function for render cars
3. Create function for add users
4. Create function for render users
*/

// Add cars
$(addCarBtn).on("click", addCar);
function addCar() {
    console.log("log");
}

// Get list of cars
async function getCarsList() {
    let response = await fetch("http://127.0.0.1:5000/panel/cars", {
        method: "GET",
        credentials: "include",
        csrf_access_token: cookies.csrf_access_token,
    });

    if (response.ok) {
        let carsList = await response.json();
        return carsList;
    } else {
        return "HTTP error: " + response.status;
    }
}
async function renderCarsList() {
    console.log(await getCarsList());
}

renderCarsList();
