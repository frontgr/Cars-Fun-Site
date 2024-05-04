export const cars = [
    {
        name: "Jackson storm",
        type: "racers",
        number: 20,
        photo: "./images/main_item_3.webp",
    },
    {
        name: "Lewis Hamilton",
        type: "racers",
        photo: "./images/main_item_4.webp",
    },
    {
        name: "Metr",
        type: "other",
        photo: "./images/main_item_5.webp",
    },
    {
        name: "Luigi",
        type: "other",
        photo: "./images/main_item_6.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Jackson storm",
        type: "racers",
        number: 20,
        photo: "./images/main_item_3.webp",
    },
    {
        name: "Lewis Hamilton",
        type: "racers",
        photo: "./images/main_item_4.webp",
    },
    {
        name: "Metr",
        type: "other",
        photo: "./images/main_item_5.webp",
    },
    {
        name: "Luigi",
        type: "other",
        photo: "./images/main_item_6.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Jackson Storm",
        type: "racers",
        number: 20,
        photo: "./images/main_item_3.webp",
    },
    {
        name: "Lewis Hamilton",
        type: "racers",
        photo: "./images/main_item_4.webp",
    },
    {
        name: "Metr",
        type: "other",
        photo: "./images/main_item_5.webp",
    },
    {
        name: "Luigi",
        type: "other",
        photo: "./images/main_item_6.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
    {
        name: "Lightning McQueen",
        number: 95,
        type: "racers",
        photo: "./images/main_item_1.webp",
    },
    {
        name: "Cruz Ramirez",
        type: "racers",
        photo: "./images/main_item_2.webp",
    },
];

function changeTab(filter, countCars = 6) {
    let content__cars = "";
    let filterType = filter.slice(4);
    cars.filter((car) => car.type == filterType || filterType == "all")
        .slice(0, countCars)
        .forEach((car) => {
            content__cars += `
        <div class="main__item car-item">
            <img
                src=${car.photo}
                alt="car image"
                class="main__item-img car-item__img"
            />
            <div class="main__item-title car-item__title">
                ${car.name} <span>${car.number ? "#" + car.number : "~"}</span>
            </div>
            <div class="item__btns">
                <button
                    class="item__btns-btn btn-photo"
                    onclick="hangePhotoButtonClick()"
                >
                    Photo
                </button>
                <a
                    href="./pages/car_info.html"
                    class="item__btns-btn btn-specifications"
                >
                    Specifications
                </a>
            </div>
        </div>`;
        });

    $(".main__content").html(content__cars);
}

let filter = "btn-racers";
changeTab(filter);
$(".main__filter-btn").each(function (index, el) {
    $(el).on("click", function () {
        $(".main__filter-btn").each(function (index, el) {
            $(el).removeClass("active");
        });
        $(this).addClass("active");
        filter = $(this).attr("id");
        countCars = 6;
        changeTab(filter, countCars);
        if (
            countCars >=
            cars.filter(
                (car) =>
                    car.type == filter.slice(4) || filter.slice(4) == "all",
            ).length
        ) {
            showMoreBtn[0].style.display = "none";
            hideBtn[0].style.display = "none";
            btnBox[0].style.flexDirection = "row-reverse";
        } else {
            hideBtn[0].style.display = "none";
            showMoreBtn[0].style.display = "block";
            btnBox[0].style.flexDirection = "row";
        }
    });
});

let showMoreBtn = $("#btn-show-more");
let btnBox = $(".show-more-btns");
let hideBtn = $("#btn-hide");
let upBtn = $("#btn-up");
let countCars = 6;
showMoreBtn.on("click", function () {
    changeTab(filter, (countCars += 6));
    let filterType = filter.slice(4);
    if (countCars <= 12) {
        hideBtn[0].style.display = "block";
    }
    if (
        countCars >=
        cars.filter((car) => car.type == filterType || filterType == "all")
            .length
    ) {
        showMoreBtn[0].style.display = "none";
    }
});
hideBtn.on("click", function () {
    if (countCars > 12) {
        changeTab(filter, (countCars -= 6));
    } else {
        changeTab(filter, (countCars = 6));
        hideBtn[0].style.display = "none";
    }
    if (showMoreBtn[0].style.display == "none") {
        showMoreBtn[0].style.display = "block";
    }
});

upBtn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
});
