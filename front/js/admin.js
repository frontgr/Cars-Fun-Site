let asideItems = $(".aside__item");
let editCarPopup = $("#edit-car-popup");
let editUserPopup = $("#edit-user-popup");
let popaps = [
    "#edit-car-popup",
    "#add-car-popup",
    "#edit-user-popup",
    "#user-popup",
    "#delete-popup",
];
let editCarBtns = $(".edit-car-btn");
let editUserBtns = $(".edit-user-btn");
let addCarBtn = $("#add-car-btn");
let addUserBtn = $("#add-user-btn");
let deleteCarBtns = $(".delete-car-btn");
let deleteUserBtns = $(".delete-user-btn");
let eyeBtns = $(".eye");

asideItems.each(function (index, el) {
    $(el).on("click", function () {
        closePopup();
        asideItems.each(function (index, el) {
            $(el).removeClass("active");
        });
        $(this).addClass("active");
        $("section").each(function (index, value) {
            $(value).removeClass("active");
        });
        $("section").eq(index).addClass("active");
    });
});

$(".popup__close").each(function (index, value) {
    $(value).on("click", closePopup);
});

function handleEditBtn(element) {
    if (element.css("display") == "none") {
        element.css("display", "flex");
    }
}

editCarBtns.each(function (index, el) {
    $(el).on("click", () => handleEditBtn($("#edit-car-popup")));
});

editUserBtns.each(function (index, el) {
    $(el).on("click", () => handleEditBtn($("#edit-user-popup")));
});

function closePopup() {
    popaps.forEach((popup) => {
        $(popup).css("display", "none");
    });
}

addCarBtn.on("click", () => handleEditBtn($("#add-car-popup")));
addUserBtn.on("click", () => handleEditBtn($("#user-popup")));

deleteCarBtns.each(function (index, el) {
    $(el).on("click", () => handleEditBtn($("#delete-popup")));
});

deleteUserBtns.each(function (index, el) {
    $(el).on("click", () => handleEditBtn($("#delete-popup")));
});

/* eye change */
eyeBtns.each((index, value) => {
    $(value).on("click", () => {
        $(value).toggleClass("active");
    });
});
/* eye change */
