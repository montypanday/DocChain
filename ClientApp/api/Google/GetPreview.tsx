
export function GetPreview(id: string) {
    return fetch("api/Google/GetPreview/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();  //we only get here if there is no error)
        });
}