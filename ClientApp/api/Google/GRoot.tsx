import { formatSizeUnits } from '../Helpers/FormatSize';
export function GRoot() {
    return fetch("api/Google/GetFolderItems/'root'", { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { throw response }
            return response.json()  //we only get here if there is no error)
        })
        .then(data => {
            //console.log(data);
            var newData = [];
            newData.push({
                type: "folder",
                id: "sharedWithMe",
                fileName: "Shared with Me",
                size: "-",
                hash: "",
                lastModified: "N/A",
                embedLink: "",
                downloadUrl: "",
                mimeType: "application/vnd.google-apps.folder",
                iconLink: ""
            });
            for (var i = 0; i < data.length; i++) {
                var a = {};
                if (data[i].mimeType == "application/vnd.google-apps.folder") {
                    //console.log(data.entries[i].type);
                    a = {
                        type: "folder",
                        id: data[i].id,
                        fileName: data[i].fileName,
                        size: formatSizeUnits(data[i].size),
                        hash: "",
                        lastModified: data[i].lastModified,
                        embedLink: "",
                        downloadUrl: "",
                        mimeType: data[i].mimeType,
                        iconLink: data[i].iconLink
                    };
                }
                else {
                    a = {
                        type: data[i].type,
                        id: data[i].id,
                        fileName: data[i].fileName,
                        size: formatSizeUnits(data[i].size),
                        hash: data[i].hash,
                        lastModified: data[i].lastModified,
                        embedLink: "https://docs.google.com/viewer?srcid=" + data[i].id + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true",
                        downloadUrl: data[i].webContentLink,
                        mimeType: data[i].mimeType,
                        iconLink: data[i].iconLink
                    };
                }
                newData.push(a)
            }
            return newData;
        });
}