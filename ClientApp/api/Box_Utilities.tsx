/**
 * Creates new Folder using given name inside the folder specified.
 * @param parentID
 * @param newName
 * @returns {Promise}
 */
export function CreateNewFolder(parentID: string, newName: string): Promise<any> {
    return fetch("/api/Box/NewFolder/" + parentID + "/" + newName, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                alert(response.status + "=> " + response.statusText);
                throw response;
            }
            return response.json();
        });
}

/**
 * Deletes the file or folder and updates the current Folder contents.
 * @param type
 * @param id
 * @param currentFolderID
 * @returns {Promise}
 */
export function Delete(type: string, id: string, currentFolderID: string): Promise<any> {
    return fetch("/api/Box/Delete/" + type + "/" + id + "/" + currentFolderID, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                alert(response.status + "=> " + response.statusText);
                throw response;
            }
            return response.json();
        });
}

/**
 * Downloads the file as a blob using the specified id.
 * @param id
 * @returns {Promise}
 */
export function Download(id: string): Promise<any> {
    return fetch("api/Box/Download/" + id, { credentials: "same-origin" })
        .then(response => {
            return response.blob();
        });
}

/**
 * Get folder items using the specified id.
 * @param id
 * @returns {Promise}
 */
export function GetFolderItemsAsync(id: string): Promise<any> {
    return fetch("/api/Box/GetFolderItems/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
}

/**
 * Get Preview link using id
 * @param {string} id The id of file.
 * @returns {Promise}
 */
export function getPreviewLink(id: string): Promise<any> {
    return fetch("/api/Box/GetPreview/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
}

/**
 * Get URL share link for file or folder.
 * @param id
 * @param type
 * @returns {Promise}
 */
export function getSharedLink(id: string, type: string): Promise<any> {
    return fetch("/api/Box/GetSharedLink/" + type + "/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.text();
        });
}

/**
 * Renames a file or folder and returns Promise to get updated parent folder contents.
 * @param id
 * @param newName
 * @param currentFolderID
 * @param toBeRenameType
 * @returns {Promise}
 */
export function Rename(id: string, newName: string, currentFolderID: string, toBeRenameType: string): Promise<any> {
    return fetch("api/Box/Rename/" + newName + "/" + id + "/" + currentFolderID + "/" + toBeRenameType, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
}

/**
 * Search for files and folders based on query.
 * @param query
 * @returns {Promise}
 */
export function Search(query: string): Promise<any> {
    return fetch("/api/Box/Search/" + query, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
}

/**
 * Uploads a new file using a POST request and updates Current Folder contents using a Promise.
 * @param currentFolderID
 * @param formData
 * @returns {Promise}
 */
export function Upload(currentFolderID: string, formData: any): Promise<any> {
    return fetch("api/Box/Upload/" + currentFolderID, {
        credentials: "same-origin",
        method: "POST",
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json();
    });
}

export function Logout() {
    return fetch("api/Box/Logout", { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { alert(response.status + "=> " + response.statusText); }
            return response.text();  //we only get here if there is no error)
        });
}