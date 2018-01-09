
export function GCreateNewFolder(parentID: string, newName: string) {
    return fetch("/api/Google/NewFolder/" + parentID + "/" + newName, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();  //we only get here if there is no error)
        });
}