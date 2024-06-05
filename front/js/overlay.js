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
  if (window.matchMedia("(min-width: 768px)").matches) {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("header__nav").style.display = "flex";
    popupWindow.css("display", "none");
  }
  else {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("header__nav").style.display = "block";
    popupWindow.css("display", "none");
  }
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
  if (window.matchMedia("(min-width: 768px)").matches) {
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
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      const iconsContainer = document.querySelector('.popup-menu__icons');
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;
      let lastTouchX = 0;
      let lastTouchTime = 0;
      let velocity = 0;

      iconsContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - iconsContainer.offsetLeft;
        scrollLeft = iconsContainer.scrollLeft;
        lastTouchX = startX;
        lastTouchTime = Date.now();
        velocity = 0;
      });

      iconsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - iconsContainer.offsetLeft;
        const walk = (x - startX) * 10; // Ускорьте прокрутку
        iconsContainer.scrollLeft = scrollLeft - walk;

        const now = Date.now();
        const deltaTime = now - lastTouchTime;
        const deltaX = x - lastTouchX;
        velocity = deltaX / deltaTime; // Скорость в px/ms

        lastTouchX = x;
        lastTouchTime = now;
      });

      iconsContainer.addEventListener('touchend', () => {
        isDragging = false;
        applyInertia();
      });

      iconsContainer.addEventListener('touchcancel', () => {
        isDragging = false;
        applyInertia();
      });

      function applyInertia() {
        const friction = 1; // Коэффициент трения
        let scrollDelta = velocity * 50; // Увеличим скорость для инерции

        function animateScroll() {
          if (Math.abs(scrollDelta) > 1) {
            iconsContainer.scrollLeft += scrollDelta;
            scrollDelta *= friction;
            requestAnimationFrame(animateScroll);
          } else {
            snapToNearest();
          }
        }

        animateScroll();
      }

      function snapToNearest() {
        const icons = Array.from(document.querySelectorAll('.popup-menu__icon'));
        const containerScrollLeft = iconsContainer.scrollLeft;
        let closest = icons[0];
        let closestDistance = Math.abs(icons[0].offsetLeft - containerScrollLeft);

        icons.forEach((icon) => {
          const distance = Math.abs(icon.offsetLeft - containerScrollLeft);
          if (distance < closestDistance) {
            closest = icon;
            closestDistance = distance;
          }
        });

        iconsContainer.scrollTo({
          left: closest.offsetLeft,
          behavior: 'smooth'
        });
      }
    });
  }
});