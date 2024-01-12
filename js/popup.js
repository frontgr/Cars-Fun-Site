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
