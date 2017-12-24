import { formatSizeUnits } from '../Helpers/FormatSize';

export function GSearch(query: string) {
    return fetch("https://www.googleapis.com/drive/v3/files?q=name+contains+'" + query + "'&trashed=false&fields=files", {
        method: "GET",
        headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("google_access_token"),
                'Accept': 'application/json'
            }
    })
        .then(response => {
            if (!response.ok) { throw response }
            return response.json()  //we only get here if there is no error)
        })
        .then(data => {
            //console.log(data);
            var newData = [];
            for (var i = 0; i < data["files"].length; i++) {
                var a = {};
                if (data.files[i].mimeType == "application/vnd.google-apps.folder") {
                    //console.log(data.entries[i].type);
                    a = { type: "folder", id: data.files[i].id, fileName: data.files[i].name, size: formatSizeUnits(data.files[i].size), hash: "", lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "", downloadUrl: "", mimeType: data.files[i].mimeType, iconLink: data.files[i].iconLink };
                }
                else {
                    a = { type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: formatSizeUnits(data.files[i].size), hash: data.files[i].md5Checksum, lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "https://docs.google.com/viewer?srcid=" + data.files[i].id + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true", downloadUrl: data.files[i].webContentLink, mimeType: data.files[i].mimeType, iconLink: data.files[i].iconLink };
                }
                newData.push(a);
            }
            return newData;

        })
}