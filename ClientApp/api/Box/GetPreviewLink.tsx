export function getPreviewLink(id: string){
    return fetch("/api/Box/GetPreview/"+id, { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { alert(response.status + "=> " + response.statusText) }
            return response.text()  //we only get here if there is no error)
        });
}