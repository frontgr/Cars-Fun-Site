let cookies = {};

// Buttons for adding something
const addCarBtn = $("#add-car");
const updateCarBtn = $("#update-car");
const addUserBtn = $("#add-user");

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
1. Create function for adding cars
2. Create function for rendering cars
3. Create function for adding users
4. Create function for rendering users
*/

// ADD CARS SECTION

// Remove a photo from the list
function removePhoto() {
    $(".add-car-popup__form .popup__photo-item").each((index, carPhoto) => {
        $(carPhoto).on("click", () => {
            $(carPhoto).remove();
        });
    });
}

// Add new photo
$(".add-car-popup__form .popup__photo-btn").on("click", () => {
    $("#addCarPhotoInput").click();
});

$("#addCarPhotoInput").change(function () {
    console.log(this.files[0]);
    if (this.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            console.log(reader.result);
            $(".add-car-popup__form .popup__photo-btn").before(
                `<div class="popup__photo-item">
                    <img src="${reader.result}" alt="" />
                    <div class="popup__photo-item_delete">+</div>
                </div>`,
            );
            removePhoto();
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// Add car function
$(addCarBtn).on("click", addCar);
function addCar() {
    console.log("log");
}

// SHOW CARS LIST SECTION

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
