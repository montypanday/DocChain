export function getSharedLink(id: string, type: string) {
    return fetch("/api/Box/GetSharedLink/" + type + "/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.text();  //we only get here if there is no error)
        });
}