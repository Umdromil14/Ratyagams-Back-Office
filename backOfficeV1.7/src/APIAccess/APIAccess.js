import axios from "axios";
import valuesToString from "../tools/valuesToString";
import { setToken } from "../store/slice/token";
import { BASE_URL } from "../constants/enum";

/**
 * Get values to display in a table
 *
 * @param {object} token token of the user
 * @param {string} url the last part of the url
 * @param {Array} keys the keys of the object to display
 * @param {object} params the params
 * @param {number} params.page the page to display
 * @param {number} params.limit the number of values to display
 * @param {object=} valueToUpdate the values to stringify before displaying
 * @param {string=} valueToUpdate.boolean the key of the boolean to update
 * @param {string=} valueToUpdate.date the key of the date to update
 * @param {string=} valueToUpdate.url the key of the url to update
 * 
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<object>} a promise with an object with the values
 *
 * @example
 * const result = await getValuesToDisplay(
 *     token,
 *     "user",
 *     ["id"],
 *     {page: 1, limit: 10},
 *     {boolean : "is_admin"}
 * );
 */
export async function getValuesToDisplay(
    token,
    url,
    keys,
    params,
    valueToUpdate = undefined
) {
    const result = valuesToString(
        (
            await axios.get(`${BASE_URL}${url}`, {
                headers: token.headers,
                params: params,
            })
        ).data,
        keys,
        valueToUpdate
    );
    return result;
}

/**
 * Get values
 *
 * @param {string} url the last part of the url
 * @param {object} token the token of the user
 * @param {object=} params the params
 * @param {string=} responseType the type of the response
 *
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<Array>} a promise with an array of values
 */
export async function getValues(
    url,
    token,
    params,
    responseType
) {
    return (
        await axios.get(`${BASE_URL}${url}`, {
            headers: token.headers,
            params: params,
            responseType: responseType,
        })
    ).data;
}

/**
 * Login user
 *
 * @param {string} url the last part of the url
 * @param {object} user the information of the user
 * @param {string} user.login the email/username of the user
 * @param {string} user.password the password of the user
 * @param {Dispatch} dispatch the dispatch function of the store
 *
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<boolean>} a promise with a boolean; `true` if the user is admin, `false` otherwise
 */
export async function login(url, user, dispatch) {
    const { data } = await axios.post(`${BASE_URL}${url}`, user);
    if (data.token) {
        dispatch(setToken(data.token));
        const { is_admin: isAdmin } = await getValues(`user/me`, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });
        return isAdmin;
    }
}

/**
 * Post values
 *
 * @param {string} url the last part of the url
 * @param {object} token the token of the user
 * @param {object} body the body to send to the server
 * @param {File=} body.picture the picture to send to the server
 *
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<void>}
 */
export async function postValues(url, token, body) {
    if (body.picture || body.platformPicture || body.videoGamesPictures) {
        await axios.post(`${BASE_URL}${url}`, body, {
            headers: {
                Authorization: token.headers.Authorization,
                "Content-Type": "multipart/form-data",
            },
        });
    } else {
        await axios.post(`${BASE_URL}${url}`, body, {
            headers: token.headers,
        });
    }
}

/**
 * Delete values
 *
 * @param {string} url the last part of the url
 * @param {object} token the token of the user
 * @param {string[]} ids the ids of the values to delete in order
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<void>}
 */
export async function deleteValues(url, token, ids) {
    await axios.delete(`${BASE_URL}${url}/${ids.join("/")}`, {
        headers: token.headers,
    });
}

/**
 * Update values
 *
 * @param {string} url the last part of the url
 * @param {object} token the token of the user
 * @param {string[]} ids the ids of the values to update in order
 * @param {object} updateValues the values to update
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<void>}
 */
export async function updateValues(url, token, ids, updateValues) {
    const headers = updateValues.picture
        ? {
              Authorization: token.headers.Authorization,
              "Content-Type": "multipart/form-data",
          }
        : token.headers;

    await axios.patch(`${BASE_URL}${url}/${ids.join("/")}`, updateValues, {
        headers: headers,
    });
}

/**
 * Get all values (max limited by the server)
 *
 * @param {string[]} urls the urls to get the values
 * @param {object} token the token of the user
 *
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<object>} a promise with an object with the values
 */
export async function getAllValues(urls, token) {
    const object = {};
    const promises = await Promise.all(
        urls.map((url) => axios.get(`${BASE_URL}${url}`, token))
    );
    promises.map((promise) =>
        urls.map((url) => {
            if (promise.config.url === `${BASE_URL}${url}`) {
                object[url] = promise.data;
            }
        })
    );
    return object;
}
