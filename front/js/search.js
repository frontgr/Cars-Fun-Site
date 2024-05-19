import { cars } from "./cars_list.js";
var inputField = document.getElementById("searchInput");

// Add event listener for keypress event
inputField.addEventListener("keypress", function (event) {
    var charCode = event.which || event.keyCode;
    if (
        (charCode < 65 || charCode > 90) &&
        (charCode < 97 || charCode > 122) &&
        charCode !== 32
    ) {
        event.preventDefault();
    }
});

// Ограничение на вставку только латинских букв
inputField.addEventListener("paste", function (event) {
    event.preventDefault();
    var paste = (event.clipboardData || window.clipboardData).getData('text');
    var filteredPaste = paste.replace(/[^a-zA-Z ]/g, '');
    var selectionStart = inputField.selectionStart;
    var selectionEnd = inputField.selectionEnd;    
    inputField.setRangeText(filteredPaste, selectionStart, selectionEnd, 'end');
});


window.search = function search(isCarInfoPage) {
    $(".search-field").removeClass("search-field__search--error");
    let inputField = document.getElementById("searchInput");
    if (inputField.value.length >= 3 && inputField.value.length <= 256) {
        $(".search-field").removeClass("search-field__search--error");
        $(".search-block").show();
        inputField = inputField.value;
        if (isCarInfoPage) {
            $(".main-info__photos").hide();
            $(".main-info__desc").hide();
            $(".main-info__info").hide();
        }
        let searchContent = "";
        $(".search-block__not-found").hide();
        cars.forEach((car) => {
            if (car.name.toLowerCase().includes(inputField.toLowerCase())) {
                searchContent += `
                <div class="search-block__item car-item">
                <img
                    src=${isCarInfoPage ? "." : ""}${car.photo}
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
        $(".search-field").addClass("search-field__search--error");
        $(".search-block").hide();
        if (isCarInfoPage) {
            $(".main-info__photos").show();
            $(".main-info__desc").show();
            $(".main-info__info").show();
        }
    }
};

window.closeSearch = function closeSearch(isCarInfoPage) {
    $(".search-field").removeClass("search-field__search--error");
    $(".search-block").hide();
    if (isCarInfoPage) {
        $(".main-info__photos").show();
        $(".main-info__desc").show();
        $(".main-info__info").show();
    }
};

window.removeError = function removeError() {
    $(".search-field").removeClass("search-field__search--error");
};

$(".search-field").keydown(function (event) {
    if (event.keyCode === 13) {
        search(true);
    }
});
