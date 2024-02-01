const cars = [
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

function changeTab(filter) {
  let content__cars = "";
  let filterType = filter.slice(4);
  cars
    .filter((car) => car.type == filterType || filterType == "all")
    .forEach((car) => {
      content__cars += `
        <div class="main__item">
            <img
                src=${car.photo}
                alt="car image"
                class="main__item-img"
            />
            <div class="main__item-title">
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
    changeTab(filter);
  });
});
