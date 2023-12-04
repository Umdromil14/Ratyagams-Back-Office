import axios from "axios";
import modelingData from "../tools/modelingData";
import { setToken } from "../store/slice/token";

export async function getValuesToDisplay(
    token,
    url,
    setError,
    setTitle,
    title,
    setValues,
    handleErrors,
    keys,
    date = undefined,
    boolean = undefined,
    link = undefined
) {
    setError(false);
    setTitle(title);
    try {
        const result = modelingData(
            (await axios.get(url, token)).data,
            keys,
            date,
            link,
            boolean
        );
        setValues(result);
    } catch (error) {
        handleErrors(error.response.data);
    }
}

export async function getValues(url, token, params = undefined) {
    let data;
    try {
        if (!params) {
            data = (await axios.get(url, token)).data;
        } else {
            data = (
                await axios.get(url, {
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
            dispatch(setToken({ payload: data.token }));
            const { is_admin } = await getValues(
                "http://localhost:3001/user/me",
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
        throw error.response.status;
    }
}

export async function postValues(url, token, body) {
    console.log(body);
    try {
        await axios.post(`http://localhost:3001/${url}`, body, token);
    } catch (error) {
        console.log(error);
    }
}
