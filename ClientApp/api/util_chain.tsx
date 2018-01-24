/**
 * Checks whether a hash exists on Blockchain.
 * @param parentID
 * @param newName
 * @returns {Promise}
 */
export function Check(hash: string): Promise<any> {
    return fetch("/api/Chain/GetAsync/" + hash)
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
}

/**
 * Puts data on the Blockchain.
 * @param hash
 */
export function PutOnChain(hash: string): Promise<any> {
    return fetch("api/Chain/PutAsync/" + hash)
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        });
}
