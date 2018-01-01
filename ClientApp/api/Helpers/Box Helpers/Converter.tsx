import { formatSizeUnits } from '../FormatSize';

export function Converter(data: any) {
    var newData = [];
    for (var item of data) {
        var a = item.type == "file" ?
            {
                type: item.type,
                id: item.id,
                fileName: item.fileName,
                size: formatSizeUnits(item.size),
                hash: item.hash,
                lastModified: item.lastModified,
                embedLink: "",
                downloadUrl: ""
            } :
            {
                type: item.type,
                id: item.id,
                fileName: item.fileName,
                size: formatSizeUnits(item.size),
                hash: "",
                lastModified: item.lastModified,
                embedLink: "",
                downloadUrl: ""
            }
        newData.push(a);
    }
    return newData;
}