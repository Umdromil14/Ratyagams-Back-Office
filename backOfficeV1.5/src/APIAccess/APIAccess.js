import axios from "axios";
import modelingData from "../tools/modelingData";
import { setToken } from "../store/slice/token";
import {baseUrl} from "../constants/enum";

export async function getValuesToDisplay(
    token,
    url,
    handleErrors,
    keys,
    query,
    valueToUpdate = undefined
) {
    try {
        const result = modelingData(
            (await axios.get(`${baseUrl}${url}`, { headers: token.headers, params: query }))
                .data,
            keys,
            valueToUpdate
        );
        return result;
    } catch (error) {
        handleErrors(error.response.data);
    }
}

export async function getValues(url, token, params = undefined) {
    let data;
    try {
        if (!params) {
            data = (await axios.get(`${baseUrl}${url}`, token)).data;
        } else {
            data = (
                await axios.get(`${baseUrl}${url}`, {
                    headers: token.headers,
                    params: params,
                })
            ).data;
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function login(url, user, dispatch) {
    try {
        const { data } = await axios.post(url, user);
        if (data.token) {
            dispatch(setToken(data.token));
            const {is_admin} = await getValues(
                `user/me`,
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );
            return is_admin;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function postValues(url, token, body) {
    try {
        await axios.post(`${baseUrl}${url}`, body, token);
    } catch (error) {
        throw error;
    }
}

export async function getAllValues(urls, token) {
    const object = {};
    try {
        const promise = await Promise.all(
            urls.map((url) => axios.get(`${baseUrl}${url}`, token))
        );
        promise.map((value) =>
            urls.map((url) => {
                if (value.config.url === `${baseUrl}${url}`) {
                    object[url] = value.data;
                }
            })
        );
        return object;
    } catch (error) {
        console.log(error);
    }
}
