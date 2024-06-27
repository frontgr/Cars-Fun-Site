function getCookie(name) {
    const value = document.cookie;
    const parts = value.split(`${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

const BACKEND_URL = "http://127.0.0.1:5000";
const TOKEN = getCookie("csrf_access_token");

async function getResource(url, method, body) {
    const myHeaders = new Headers();
    myHeaders.append("X-CSRF-TOKEN", getCookie("csrf_access_token"));
    const options = {
        method: method,
        headers: myHeaders,
    };
    const res = await fetch(BACKEND_URL + url, options);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
}

async function getCars() {
    try {
        const result = await getResource("/panel/cars", "GET");
        console.log(result);
        return result;
    } catch {
        throw new Error();
    }
}

console.log(document.cookie);
getCars();
