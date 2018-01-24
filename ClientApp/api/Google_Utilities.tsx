/**
 * Creates new Folder using given name inside the folder specified.
 * @param parentID
 * @param newName
 * @returns {Promise}
 */
export function GCreateNewFolder(parentID: string, newName: string): Promise<any> {
    return fetch("/api/Google/NewFolder/" + parentID + "/" + newName, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
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
export function GDelete(id: string, currentFolderID: string): Promise<any> {
    return fetch("api/Google/Delete/" + id + "/" + currentFolderID, { credentials: "same-origin" })
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
export function GetPreview(id: string): Promise<any> {
    return fetch("api/Google/GetPreview/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
}

/**
 * Download File as stream.
 * @param id
 */
export function GDownload(id: string): Promise<any> {
    return fetch("api/Google/Download/" + id, { credentials: "same-origin" })
        .then(response => {
            return response.blob();
        });
}

export function GNavigateIntoFolder(id: string) {
    return fetch("api/Google/GetFolderItems/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();
        });
}

export function GRename(id: string, newName: string, currentFolderID: string, toBeRenameType: string) {
    return fetch("api/Google/Rename/" + newName + "/" + id + "/" + currentFolderID + "/" + toBeRenameType, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }

            return response.json();
        });
}


export function GSearch(query: string) {
    return fetch("/api/Google/Search/" + query, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();
        });
}

export function Upload(currentFolderID: string, formData: any) {
    return fetch("api/Google/Upload/" + currentFolderID, {
        credentials: "same-origin",
        method: "POST",
        body: formData
    }).then(response => {
        if (!response.ok) { throw response; }
        return response.json();
    });
}

export function Logout() {
    return fetch("api/Google/Logout", { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.text();  //we only get here if there is no error)
        });
}


/**
 * Get URL share link for file or folder.
 * @param id
 * @param type
 * @returns {Promise}
 */
export function getSharedLink(id: string): Promise<any> {
    return fetch("/api/Google/GetSharedLink/" + id, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.text();
        });
}