import Constants from "../util/Constants";
import { options } from "react-native-mmkv-storage/dist/src/utils";


export async function makeLogin(email, passwd, navigation) {

    // email = 'oleiro87@gmail.com';
    // passwd = '1221';

    const login_info = {
        email,
        passwd,
    };

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    };

    const options = {
        method: 'POST',
        mode: "cors",
        headers: headers,
        body: JSON.stringify(login_info)
    };

    const url = `${Constants.HOST}/login`;

    const raw = await fetch(url, options);

    if (raw.status == 200) {
        const id = raw.headers.get('id');
        const body = await raw.json();
        const token = body['token'];
        const radius = body['radius']
        const nickname = body['nickname']
        return ({ token, id, radius, nickname })
    }
    if (raw.status == 400) {
        const body = await raw.json();
        const errorMsg = body['erro'];
        throw errorMsg;
    }
}

export async function updateLocation(updateInfo, token, id) {

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const options = {
        method: 'POST',
        mode: "cors",
        headers: headers,
        body: JSON.stringify(updateInfo)
    };

    const url = `${Constants.HOST}/updateLocation/${id}`;

    try {
        const raw = await fetch(url, options);
        if (raw.status === 401) console.error('Não autorizado');
    } catch (e) {
        console.log(e);
    }
}

export async function getUsersPerDistance(token, id, lat, long, radius) {

    console.log("oi")
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const options = {
        method: 'GET',
        mode: "cors",
        headers: headers,
    };

    radius = radius * 1000;
    const url = `${Constants.HOST}/getusers/all/${id}?distance=${radius}&lat=${lat}&long=${long}`;
    try {
        const raw = await fetch(url, options);
        if (raw.status == 200) {
            const body = await raw.json();
            if (body.length != 0) {
                // console.log(JSON.stringify(body))
                return body;
            }
        }
        return null;
    }
    catch (e) {
        console.log(e)
    }

}
// ate 4km -> 1 pessoa
// 5km -7 km -> 2 pessoas
// 8km -13km -> 3 pessoas
// 14km - 18km -> 4 pessoas
// 19+km -> 5 pessoas

//     const login_info = {
//         email,
//         passwd,
//     };
//     const service = new Service("login");
//     const myJSON = JSON.stringify(login_info);
//     const headers = {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json',
//     }

//     return service.doReq('POST', myJSON, headers)
// }
//     console.dir(service)
//     // service.doReq('POST', myJSON, headers)
//     //     .then(console.dir)
//     //     .catch(console.error)
// }
// http://localhost:8081/updateLocation/15