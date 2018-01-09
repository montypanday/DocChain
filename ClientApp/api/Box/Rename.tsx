export function Rename(id: string, newName: string, currentFolderID: string, toBeRenameType:string) {
    return fetch("api/Box/Rename/" + newName + "/" + id + "/" + currentFolderID + "/" + toBeRenameType, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }

            return response.json(); //we only get here if there is no error)
        });
}