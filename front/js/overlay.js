let popupWindow = $("#popupWindow");

function hangePhotoButtonClick(event) {
  if (popupWindow.css("display") == "none") {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("header__nav").style.display = "none";
    popupWindow.css("display", "flex");
  } else {
    document.getElementById("overlay").style.display = "none";
    popupWindow.css("display", "none");
  }
}
$(".popup__slider-close").on("click", function (e) {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("header__nav").style.display = "flex";
  popupWindow.css("display", "none");
});
$(document).on("click", function (e) {
  if (
    !(
      $(e.target).closest("#popupWindow").length > 0 ||
      $(e.target).closest(".btn-photo").length > 0
    )
  ) {
    document.getElementById("overlay").style.display = "none";
    $("#popupWindow").hide();
  }
});

// Переключение выделения картинок в слайдере + замена главной картинки

$(document).ready(function() {
  
  // Пролистывание вправо

  $(".popup-menu__right").click(function() {
    let currentImage = $('.popup-menu__icons .popup-menu__icon--selected');
    let nextImage = currentImage.next('img');

    if (nextImage.length) {
      currentImage.removeClass('popup-menu__icon--selected');
      nextImage.addClass('popup-menu__icon--selected');
      let imagePath = nextImage.attr('src');
      $('.popup__main-photo').attr('src', imagePath);
    } else {
      $('.popup-menu__icons img:first').addClass('popup-menu__icon--selected');
      currentImage.removeClass('popup-menu__icon--selected');
      let firstImagePath = $('.popup-menu__icons img:first').attr('src');
      $('.popup__main-photo').attr('src', firstImagePath);
    }
  });

  // Пролистывание влево

  $(".popup-menu__left").click(function() {
    let currentImage = $('.popup-menu__icons .popup-menu__icon--selected');
    let prevImage = currentImage.prev('img');

    if (prevImage.length) {
      currentImage.removeClass('popup-menu__icon--selected');
      prevImage.addClass('popup-menu__icon--selected');
      let imagePath = prevImage.attr('src');
      $('.popup__main-photo').attr('src', imagePath);
    } else {
      $('.popup-menu__icons img:last').addClass('popup-menu__icon--selected');
      currentImage.removeClass('popup-menu__icon--selected');
      let lastImagePath = $('.popup-menu__icons img:last').attr('src');
      $('.popup__main-photo').attr('src', lastImagePath);
    }
  });

  // По нажататию на картинку
  
  $(".popup-menu__icon").click(function() {
    let imagePath = $(this).attr('src');
    $('.popup-menu__icons .popup-menu__icon--selected').removeClass('popup-menu__icon--selected');
    $(this).addClass('popup-menu__icon--selected');
    $('.popup__main-photo').attr('src', imagePath);
  });
});


