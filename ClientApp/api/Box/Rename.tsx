export function Rename(id:string, newName: string) {
    return fetch("api/Box/Rename/" + id + "/" + newName, { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { alert(response.status + "=> " + response.statusText) }
            return response.text()  //we only get here if there is no error)
        });
}