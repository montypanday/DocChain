import { Converter } from '../Helpers/Box Helpers/Converter';


export function Delete(type: string, id: string, currentFolderID: string) {
    return fetch("/api/Box/Delete/" + type + "/" + id + "/" + currentFolderID, { credentials: 'same-origin' })
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