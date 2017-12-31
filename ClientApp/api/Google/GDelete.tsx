import { GConverter } from '../Helpers/Google Helpers/GConverter';

export function GDelete(id: string, currentFolderID: string) {
    return fetch("api/Google/Delete/" + id + "/" + currentFolderID, { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { throw response }
            return response.json()  //we only get here if there is no error)
        })
        .then(data => {
            return GConverter(currentFolderID, data);
        });
}