
export function Upload(currentFolderID: string, formData: any) {
    return fetch('api/Google/Upload/' + currentFolderID, {
        credentials: 'same-origin',
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) { throw response }
        return response.json()  //we only get here if there is no error)
    });
}