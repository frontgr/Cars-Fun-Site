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
$(".add-car-popup__form .popup__photo-btn").on("click", (event) => {
    event.preventDefault();
    $("#addCarPhotoInput").click();
});

$("#addCarPhotoInput").change(function () {
    if (this.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
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
    let name = $(
        ".add-car-popup__form input[placeholder='Name of a car...']",
    ).val();
    let number = $(
        ".add-car-popup__form input[placeholder='Number, if available...']",
    ).val();
    let type = $(".add-car-popup__btns-btn.active").text().trim().toLowerCase();
    let speed_up = $(".add-car-popup__form .popup__input_speed").val();
    let max_speed = $(".add-car-popup__form .popup__input_acceleration").val();
    let description = $(
        ".add-car-popup__form textarea[placeholder='Description...']",
    ).val();

    // List of photos
    let photos = $(".add-car-popup__form .popup__photo-item");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("number", number);
    formData.append("type", type);
    formData.append("speed_up", speed_up);
    formData.append("max_speed", max_speed);
    formData.append("description", description);
    const requestOptions = {
        method: "POST",
        body: formData,
        redirect: "follow",
    };

    // Console.log data from the form
    formData.forEach((k, v) => {
        console.log(k, "-", v);
    });

    // TODO: Send data
    // fetch("http://127.0.0.1:5000/panel/car", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.error(error));
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
