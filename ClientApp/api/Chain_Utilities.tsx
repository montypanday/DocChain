export function CheckIfTracked(fileID: string, platform: string) {
    return fetch("/api/Chain/CheckIfTracked?fileID=" + fileID + "&platform=" + platform, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();
        })
        .then(data => {
            return data;
        });
}

export function GetDocchainStatus(fileID: string, platform: string, hash: string) {
    return fetch("/api/FileAction/GetDocchainStatus/" + fileID + "/" + platform + "/" + hash,
        {
            credentials: "same-origin",
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data
        });
}

export function GetFileHistory(fileID: string, platform: string) {
    return fetch("/api/FileAction/GetActionsByFile/" + fileID + "/" + platform,
        {
            credentials: "same-origin",
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();
        }).then(data => {
            console.log(data);
            return data
        });
}

