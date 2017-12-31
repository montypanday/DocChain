import { GConverter } from '../Helpers/Google Helpers/GConverter';

export function GRoot() {
    return fetch("api/Google/GetFolderItems/root", { credentials: 'same-origin' })
        .then(response => {
            if (!response.ok) { throw response }
            return response.json()  //we only get here if there is no error)
        })
        .then(data => {
            return GConverter("root", data);
        });
}