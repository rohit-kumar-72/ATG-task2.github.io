import axios from 'axios';

const instance = axios.create();

export const apiConnector = (method, url, body, headers) => {
    return instance({
        method: method,
        url: url,
        data: body ? body : null,
        headers: headers ? headers : null
    })
}
