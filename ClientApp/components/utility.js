

export function navigateOutOmitArray(id, pathCollection) {
    
    var index;
    for (var i = 0; i < pathCollection.length; i++) {
        (pathCollection[i].fileId === id) && (index = i);
    }
    pathCollection.length = index + 1;
    var newPathCollection = JSON.parse(JSON.stringify(pathCollection));
    console.log(this);
    return newPathCollection;
}


