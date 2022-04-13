import Service from "../util/Service";
import Constants from "../util/Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    try {
        const raw = await fetch(url, options);
        const status = raw.status;
        if (raw.status == 200) {

            const id = raw.headers.get('id');
            const body = await raw.json();
            const token = body['token'];
            await storeData('token', token);
            await storeData('id', id);
            return navigation.navigate('Home',
                { token: token, id: id })
        }

        const body = await raw.json();
        const errorMsg = body['erro'];
        console.log("ERRO -> " + errorMsg)
    } catch (error) {
        console.error("erro");
    }
}

export async function updateLocation(updateInfo) {

    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    };

    const options = {
        method: 'POST',
        mode: "cors",
        headers: headers,
        body: JSON.stringify(updateInfo)
    };

    const id = await getData('id');
    const url = `${Constants.HOST}/updateLocation/${id}`;

    try {
        const raw = await fetch(url, options);
        console.log(raw)
        // const json = await raw.json();
        // console.log("resultado back" + JSON.stringify(json));
    } catch (e) {
        console.error(e);
    }
}

export async function getData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value
        }
    } catch (e) {
        console.error(e);
    }
}

// export function getUsersPerDistance(email, passwd) {

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

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error(e);
    }
}