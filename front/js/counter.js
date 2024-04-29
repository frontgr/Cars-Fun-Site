let top_speed = $("#top_speed");
let time_to_100 = $("#time_to_100");

function counterSpeed(element, endValue) {
    let value = 0;
    let duration = 2000;
    element.text(value);
    let interval = setInterval(function () {
        if (value < endValue) {
            value++;
        } else {
            clearInterval(interval);
        }
        element.text(value);
    }, duration / endValue);
}
counterSpeed(time_to_100, time_to_100[0].innerHTML);
counterSpeed(top_speed, top_speed[0].innerHTML);
