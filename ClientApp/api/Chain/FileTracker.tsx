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
