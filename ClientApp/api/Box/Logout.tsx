export function Logout() {
    return fetch("api/Box/Logout", { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { alert(response.status + "=> " + response.statusText); }
            return response.text();  //we only get here if there is no error)
        });
}