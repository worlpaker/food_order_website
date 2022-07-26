import axios from 'axios';

// Check refresh token authorization in the backend 

export function CheckToken() {

    const isLoggedIn = (localStorage.getItem("access") !== null) ? true : false;

    const handleSuccessToken = (response) => {
        if (response.status === 200) {
            const token = response.data.access;
            localStorage.setItem("access", token);
        }
        else {
            console.log("Invalid Token");
        }
    };
    const handleErrorToken = (error) => {
        localStorage.removeItem("access");
        console.log(error);
        window.location.href = "/";

    };

    if (isLoggedIn) {
        async function fetchData() {
            let crsf_token = document.cookie.replace(/(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");  // eslint-disable-line
            await axios('/api/authcheck/', {
                method: 'POST',
                credentials: 'include',
                headers: { 'X-CSRFToken': crsf_token }
            })
                .then((res) => handleSuccessToken(res))
                .catch((err) => handleErrorToken(err));
        }
        fetchData();
    }
    else {
        window.location.href = "/";
    }



}


