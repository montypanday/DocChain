import { formatSizeUnits } from '../FormatSize';

export function GConverter(id: string, data: any) {
    //console.log(data);
    var newData = [];
    if (id == 'root') {
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
    }
    for (var i = 0; i < data.length; i++) {
        var a = {};
        if (data[i].mimeType == "application/vnd.google-apps.folder") {
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
}