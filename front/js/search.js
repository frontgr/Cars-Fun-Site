import { cars } from "./cars_list.js";
window.search = function search() {
    $(".header__search").removeClass("header__search--error");
    let inputField = document.getElementById("searchInput");
    if (inputField.value.length >= 3 && inputField.value.length <= 256) {
        $(".header__search").removeClass("header__search--error");
        $(".search-block").show();
        inputField = inputField.value;
        let searchContent = "";
        $(".search-block__not-found").hide();
        cars.forEach((car) => {
            if (car.name.toLowerCase().includes(inputField.toLowerCase())) {
                console.log(car.name);
                searchContent += `
                <div class="search-block__item car-item">
                <img
                    src=${car.photo}
                    alt="car image"
                    class="car-item__img"
                />
                <div class="car-item__title">
                ${car.name} <span>${car.number ? "#" + car.number : "~"}</span>
                </div>
                <div class="car-item__btns">
                    <button
                        class="car-item__btns-btn btn-photo"
                        onclick="hangePhotoButtonClick()"
                    >
                        Photo
                    </button>
                    <a
                        href="./pages/car_info.html"
                        class="car-item__btns-btn btn-specifications"
                    >
                        Specifications
                    </a>
                </div>
            </div>
                `;
            }
            $(".search-block__container").html(searchContent);
        });
        if (searchContent === "") {
            $(".search-block__not-found").show();
        }
    } else {
        $(".header__search").addClass("header__search--error");
        $(".search-block").hide();
    }
};

window.closeSearch = function closeSearch() {
    $(".header__search").removeClass("header__search--error");
    $(".search-block").hide();
};

window.removeError = function removeError() {
    $(".header__search").removeClass("header__search--error");
};

$(".header__search").keydown(function (event) {
    if (event.keyCode === 13) {
        search();
    }
});
