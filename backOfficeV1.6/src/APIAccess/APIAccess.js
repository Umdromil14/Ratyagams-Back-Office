import axios from "axios";
import modelingData from "../tools/modelingData";
import { setToken } from "../store/slice/token";
import { baseUrl } from "../constants/enum";

/**
 * This function is used to get the values to display in the table
 *
 * @param {object} token - token of the user
 * @param {string} url - the last part of the url
 * @param {Function} handleErrors - function to handle errors
 * @param {Array} keys - the keys of the object to display
 * @param {object} query - the query to send to the server
 * @param {number} query.page - the page to display
 * @param {number} query.limit - the number of values to display
 * @param {object=} valueToUpdate - the values to update
 * @param {string=} valueToUpdate.boolean - the key of the boolean to update
 * @param {string=} valueToUpdate.date - the key of the date to update
 * @param {string=} valueToUpdate.url - the key of the url to update
 * @returns {object} return an object with the values to display
 *
 * @example
 *
 * const result = await getValuesToDisplay(
 *     token,
 *     "user",
 *     ["id"],
 *     {page: 1, limit: 10},
 *     {boolean : "is_admin"}
 */
export async function getValuesToDisplay(
    token,
    url,
    keys,
    query,
    valueToUpdate = undefined
) {
    const result = modelingData(
        (
            await axios.get(`${baseUrl}${url}`, {
                headers: token.headers,
                params: query,
            })
        ).data,
        keys,
        valueToUpdate
    );
    return result;
}

/**
 * This function is used to get values with params or not
 *
 * @param {string} url - the last part of the url
 * @param {object} token - the token of the user
 * @param {object=} params - the params to send to the server
 * @returns {object} return the values
 */
export async function getValues(url, token, params = undefined) {
    let data;
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
}

/**
 * This function is used login the user and get the token
 *
 * @param {string} url - the last part of the url
 * @param {object} user - the user to login
 * @param {string} user.login - the email/username of the user
 * @param {Dispatch} dispatch - the dispatch function
 *
 * @returns {Promise<boolean>} return true if the user is admin, false if not
 *
 */
export async function login(url, user, dispatch) {
    const { data } = await axios.post(`${baseUrl}${url}`, user);
    if (data.token) {
        dispatch(setToken(data.token));
        const { is_admin } = await getValues(`user/me`, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        return is_admin;
    }
}

/**
 * This function is used to post values to the server
 * @param {string} url - the last part of the url
 * @param {object} token - the token of the user
 * @param {object} body - the body to send to the server
 * @returns {Promise<void>}
 */
export async function postValues(url, token, body) {
    await axios.post(`${baseUrl}${url}`, body, token);
}

/**
 * This function is used to get all values from the urls
 * @param {Array} urls - the urls to get the values
 * @param {object} token - the token of the user
 * @returns {object} return an object with the values
 */
export async function getAllValues(urls, token) {
    const object = {};
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
}
