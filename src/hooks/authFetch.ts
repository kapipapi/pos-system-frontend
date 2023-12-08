const MAIN_ENDPOINT = 'http://localhost:8080/';

export async function authFetchGet<T>(endpoint: string, token: string | undefined): Promise<T> {
    const res = await fetch(MAIN_ENDPOINT + endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token ?? ''
        },
    });
    return await res.json() as T;
}

export async function authFetchPost<T>(endpoint: string, token: string | undefined, payload: any): Promise<T> {
    const res = await fetch(MAIN_ENDPOINT + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token ?? ''
        },
        body: JSON.stringify(payload)
    });
    return await res.json() as T;
}

export async function authFetchDelete<T>(endpoint: string, token: string | undefined): Promise<T> {
    const res = await fetch(MAIN_ENDPOINT + endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token ?? ''
        },
    });
    return await res.json() as T;
}