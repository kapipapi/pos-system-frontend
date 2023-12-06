export async function authFetchGet<T>(endpoint: string, token: string | undefined): Promise<T> {
    const MAIN_ENDPOINT = 'http://localhost:8080/';

    const res = await fetch(MAIN_ENDPOINT + endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token ?? ''
        },
    });
    return res.json() as T;
}

export async function authFetchPost<T>(endpoint: string, token: string | undefined, payload: any): Promise<T> {
    const MAIN_ENDPOINT = 'http://localhost:8080/';

    const res = await fetch(MAIN_ENDPOINT + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token ?? ''
        },
        body: JSON.stringify(payload)
    });
    return res.json() as T;
}