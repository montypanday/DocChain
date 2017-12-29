import { formatSizeUnits } from '../Helpers/FormatSize';

export function Search(query: string) {
    //this is the network call made everytime the page is reload, before the render method.
    return fetch("/api/Box/Search/" + query, { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json()  //we only get here if there is no error)
        })
        .then(data => {
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

