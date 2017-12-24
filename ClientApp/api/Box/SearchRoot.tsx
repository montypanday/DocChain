import { formatSizeUnits } from '../Helpers/FormatSize';
export function searchRoot(){
    //this is the network call made everytime the page is reload, before the render method.
    return fetch("/api/Box/GetRoot", { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { alert(response) }
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

