import { API_PATH } from './apiConstant';

function getData(url, callback) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(`${API_PATH}${url}`, options)
        .then((response) => response.json())
        .then(callback)
        .catch(callback)
}

function postData(url, data, callback) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(`${API_PATH}${url}`, options)
        .then((response) => response.json())
        .then(callback)
        .catch(callback)
}

function putData(url, data, callback) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(`${API_PATH}${url}`, options)
        .then((response) => response.json())
        .then(callback)
        .catch(callback)
}

function deleteData(url, id, callback) {
    const options = {
        method: 'DELETE',
    };
    fetch(`${API_PATH}${url}/${id}`, options)
        .then((response) => response.json())
        .then(callback);
}

export { getData, postData, deleteData, putData };
