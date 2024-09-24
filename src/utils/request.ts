
// for next version @butility/network is implemented
export function get(url: string, callback: Function) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Successful response, invoke the callback with the parsed response
                callback(xhr.responseText);
            } else {
                // Error response, invoke the callback with null
                callback(null);
            }
        }
    };

    xhr.send();
}

export function post(url: string, data: any, callback: Function) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                callback(null);
            }
        }
    };

    xhr.send(data);
}
