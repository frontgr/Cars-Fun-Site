async function sendLoginRequest(formData) {
    const options = {
        method: "POST",
        credentials: "include",
        body: formData,
    };

    const res = await fetch("http://127.0.0.1:5000/login", options);

    if (!res.ok) {
        const errorMessage = await res.text();
        $("input").css("border", "2px solid red");
        $("input").on("focus", function () {
            $(this).css("border", "");
        });
        throw new Error(`${errorMessage}`);
    } else {
        window.location.href = "./admin.html";
    }
}

function makeRequest() {
    document
        .getElementById("loginForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            var login = document.getElementById("login").value;
            var password = document.getElementById("password").value;

            const formData = new FormData();

            formData.append("login", login);
            formData.append("password", password);

            sendLoginRequest(formData);
        });
}

makeRequest();
