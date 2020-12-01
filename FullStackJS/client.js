function logDate() {
    console.log('Got into logDate()');

    const request = new XMLHttpRequest();

    request.open("POST", "http://127.0.0.1:3000/logdate", true);
    request.onload = function ()
    {
        console.log('onload complete');
        let msg = this.response;

        if (request.status === 200 || request.status === 404)
        {
            console.log(`Message: ${msg}`);
        }
        else
        {
            console.log(`Error occurred: Status: ${request.status}`);
        }
    }

    request.send();
}

function logView() {
    console.log('Got into logView()');

    const request = new XMLHttpRequest();

    request.open("GET", "http://127.0.0.1:3000/dates", true);
    request.onload = function ()
    {
        let msg = this.response;

        if (request.status === 200 || request.status === 404)
        {
            console.log(`Message: ${msg}`);
            document.querySelector('#date').innerHTML = msg;
        }
        else
        {
            console.log(`Error occurred: Status: ${request.status}`);
        }
    }

    request.send();
}
