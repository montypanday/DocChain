import { formatSizeUnits } from '../Helpers/FormatSize';

export function Delete(type: string, id: string, currentFolderID: string) {
    return fetch("/api/Box/Delete/" + type + "/" + id + "/" + currentFolderID, { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { alert(response.status + "=> " + response.statusText) }
            return response.json()  //we only get here if there is no error)
        })
        .then(data => {
            //alert(data);
            //console.log(data);
            var newData = [];
            for (var i = 0; i < data.length; i++) {

                var a = {};
                if (data[i].type == "file") {
                    //console.log(data.entries[i].type);
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