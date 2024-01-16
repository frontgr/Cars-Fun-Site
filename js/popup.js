let popupWindow = $("#popupWindow");

function hangePhotoButtonClick(event) {
  if (popupWindow.css("display") == "none") {
    popupWindow.css("display", "flex");
  } else {
    popupWindow.css("display", "none");
  }
}

$(document).on("click", function (e) {
  if (
    !(
      $(e.target).closest("#popupWindow").length > 0 ||
      $(e.target).closest(".btn-photo").length > 0
    )
  ) {
    $("#popupWindow").hide();
  }
});


let asideItems = $(".aside__item");
asideItems.each(function(index, el){
  $(el).on("click", function(){
    asideItems.each(function(index, el){
      $(el).removeClass("active");
    })
    $(this).addClass("active");
    $("section").each(function(index, value){
      $(value).removeClass("active");
    })
    $("section").eq(index).addClass("active");
  })
})



$('.popup__close').each(function(index, value){
  $(value).on("click",closePopup);
})
let editCarPopup = $("#edit-car-popup");
let editUserPopup = $("#edit-user-popup");
function handleEditBtn(element) {
    if (element.css("display") == "none") {
      element.css("display", "flex");
    }
  
}

let editCarBtns = $(".edit-car-btn");
editCarBtns.each(function(index, el){
  $(el).on("click", ()=>handleEditBtn($('#edit-car-popup')));
})


let editUserBtns = $(".edit-user-btn");
editUserBtns.each(function(index, el){
  $(el).on("click", ()=>handleEditBtn($('#edit-user-popup')));
})

let popaps = ['#edit-car-popup', '#add-car-popup', '#edit-user-popup', '#user-popup','#delete-popup'];

function closePopup() {
  popaps.forEach(popup => {
    $(popup).css("display", "none");
  })
}

let addCarBtn = $("#add-car-btn");
addCarBtn.on("click", ()=>handleEditBtn($('#add-car-popup')));

let addUserBtn = $("#add-user-btn");
addUserBtn.on("click", ()=>handleEditBtn($('#user-popup')));



let deleteCarBtns = $(".delete-car-btn");
deleteCarBtns.each(function(index, el){
  $(el).on("click", ()=>handleEditBtn($('#delete-popup')));
})

let deleteUserBtns = $(".delete-user-btn");
deleteUserBtns.each(function(index, el){
  $(el).on("click", ()=>handleEditBtn($('#delete-popup')));
})


/* eye change */
let eyeBtns = $(".eye");
eyeBtns.each((index, value)=>{
  $(value).on("click", ()=>{
    $(value).toggleClass("active");
  })
})
/* eye change */