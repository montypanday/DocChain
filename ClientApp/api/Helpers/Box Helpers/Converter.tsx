import { formatSizeUnits } from '../FormatSize';

export function Converter(data: any) {
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
        for (var item in data) {
            console.log(item);
        }
        newData.push(a);
    }
    return newData;
}