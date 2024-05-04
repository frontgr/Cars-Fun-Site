const cars = window.cars;
let inputField = document.getElementById("searchInput");
let inputButton = document.getElementById("searchInputButton");

console.log(cars);
function search() {
    if (inputField.value.length >= 3) {
        $(".search-block").show();
    } else {
        $(".search-block").hide();
    }
}

function closeSearch() {
    $(".search-block").hide();
}
