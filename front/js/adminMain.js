let cookies = {};

// Create object from cookies
document.cookie.split(";").forEach(function (cookieItem) {
    cookies[cookieItem.split("=")[0].trim()] = cookieItem.split("=")[1].trim();
});

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
