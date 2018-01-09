export function getPreviewLink(id: string) {
    return fetch("/api/Box/GetPreview/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();  //we only get here if there is no error)
        });
}