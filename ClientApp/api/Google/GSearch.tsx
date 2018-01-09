
export function GSearch(query: string) {
    //this is the network call made everytime the page is reload, before the render method.
    return fetch("/api/Google/Search/" + query, { credentials: "same-origin" })
        .then(response => {
            if (!response.ok) { throw response; }
            return response.json();  //we only get here if there is no error)
        });
}
