import { Converter } from '../Helpers/Box Helpers/Converter';

export function CreateNewFolder(parentID: string, newName: string) {
    return fetch("/api/Box/NewFolder/" + parentID + "/" + newName, { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) {
                alert(response.status + "=> " + response.statusText);
                throw response;
            }
            return response.json()  //we only get here if there is no error)
        })
        .then(data => {
            return Converter(data);
        });
}