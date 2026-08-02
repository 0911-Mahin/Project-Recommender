const baseURL = import.meta.env.VITE_REST_API_URL || 'http://localhost:8000'

export async function refreshTokens() {
    const refresh = localStorage.getItem('refresh')
    const res = await fetch(baseURL + '/api/token/refresh/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh })
    }).catch(() => { })

    if (res?.status === 200) {
        const token = await res.json()
        return token.access
    }
}

export async function getToken(username, password) {
    const res = await fetch(baseURL + "/api/token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    }).catch(() => { });

    let message = "Something went wrong. Please try again later.";
    let type = "error";
    let tokens
    if (res?.status === 200) {
        tokens = await res.json();
        message = "Login successful!"
        type = "info"
    } else if (res?.status === 401) {
        const err = await res.json();
        message = err.detail;
        type = "error";
    }
    return [message, type, tokens]
}

export async function registerAccount(email, username, password) {
    const res = await fetch(baseURL + "/account/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    }).catch(() => { });

    let message = "Something went wrong. Please try again later.";
    let type = 'error';
    if (res?.status === 201) {
        const res_json = await res.json();
        message = res_json.message
        type = 'info'
    } else if (res && (res.status === 422 || res.status === 400)) {
        const err = await res.json()
        message = err.error
        type = 'error'
    }

    return [message, type]
}

export async function recommendProjects(query) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const token = localStorage.getItem('token')
    if (token) {
        myHeaders.append("Authorization", "Bearer " + token);
    }

    const res = await fetch(baseURL + "/recommend/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ skills: query }),
    }).catch(() => { })

    let message = "Something went wrong. Please try again later."
    let data
    if (res?.status == 200) {
        const data = await res.json()
        return data
    } else if (res?.status == 429) {
        const data = await res.json()
        const sec = data.detail.match(/(\d+)/)[0];

        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);
        const seconds = sec % 60;
        const hDisplay = String(hours).padStart(2, '0');
        const mDisplay = String(minutes).padStart(2, '0');
        const sDisplay = String(seconds).padStart(2, '0');

        return `Dialy Limit Reached. Reset in \n${hDisplay} hours ${mDisplay} minutes ${sDisplay} seconds`
    }
}

export async function addOrRemoveFavorite(id, state, token) {
    const url = baseURL + "/account" + (state ? "/add" : "/remove") + "_favorite/"
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const res = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ "project_id": id }),
    })

    if (!(res?.status === 201 || res?.status === 200)) {
        return false
    }
    return true;
}

export async function fetchFavorites(token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const res = await fetch(baseURL + "/account/favorites/", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        },
    })

    if (res?.status === 200) {
        const data = await res.json()
        return data
    }
}

export async function fetchHistory(token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const res = await fetch(baseURL + "/account/searches/", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        },
    })

    if (res?.status === 200) {
        const data = await res.json()
        return data
    }
}
