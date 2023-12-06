
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