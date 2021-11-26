import Service from "../util/Service"


export function makeLogin(email, passwd) {

    const login_info = {
        email,
        passwd,
    };
    const service = new Service("login");
    const myJSON = JSON.stringify(login_info);
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    }
    let status;
    return service.doReq('POST', myJSON, headers)
}
export function makeLogin1(email, passwd) {

    const login_info = {
        email,
        passwd,
    };
    const service = new Service("login");
    const myJSON = JSON.stringify(login_info);
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    }
    return service.doReq('POST', myJSON, headers)
}

export async function updateLocation(updateInfo) {
    console.log("oi")
    // console.log('updateinfo: ' + JSON.stringify(updateInfo));
    const service = new Service("updateLocation/15");
    const myJSON = JSON.stringify(updateInfo);
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    }

    const options = {
        method: 'POST',
        mode: "cors",
        headers: headers,
        body: JSON.stringify(updateInfo)
    };
    try {
        const raw = await fetch("http://10.0.2.2:8081/updateLocation/1", options);
        const json = await raw.json();
        console.log("resultado back" + JSON.stringify(json))
    } catch (e) {
        console.error(e);
    }
}
//     console.dir(service)
//     // service.doReq('POST', myJSON, headers)
//     //     .then(console.dir)
//     //     .catch(console.error)
// }
// http://localhost:8081/updateLocation/15