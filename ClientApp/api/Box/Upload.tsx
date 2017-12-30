import { formatSizeUnits } from '../Helpers/FormatSize';


export function Upload(currentFolderID: string, formData: any) {
    return fetch('api/Box/Upload/' + currentFolderID, {
        credentials: 'same-origin',
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) { throw response; }
        return response.json()  //we only get here if there is no error)
    }).then(data => {
        var newData = [];
        for (var i = 0; i < data.length; i++) {

            var a = {};
            if (data[i].type == "file") {
                a = {
                    type: data[i].type,
                    id: data[i].id,
                    fileName: data[i].fileName,
                    size: formatSizeUnits(data[i].size),
                    hash: data[i].hash,
                    lastModified: data[i].lastModified,
                    embedLink: "",
                    downloadUrl: ""
                }
            }
            if (data[i].type == "folder") {
                a = {
                    type: data[i].type,
                    id: data[i].id,
                    fileName: data[i].fileName,
                    size: formatSizeUnits(data[i].size),
                    hash: "",
                    lastModified: data[i].lastModified,
                    embedLink: "",
                    downloadUrl: ""
                }
            }
            newData.push(a);
        }
        return newData;
    });
}