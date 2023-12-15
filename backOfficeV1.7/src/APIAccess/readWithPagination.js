import { getAllValues, getValuesToDisplay, getValues } from "./APIAccess";
import * as Enum from "../constants/enum";
import { modelingPublication } from "../tools/valuesToString";

/**
 * this function is used to read data in the database
 *
 * @param {string} title the title of the data to read
 * @param {object} params the parameters to use
 * @param {number} params.page the page to display
 * @param {number} params.limit the number of values to display
 * @param {object} token the token to use
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<Array>} return an object with the values to display
 *
 */
export async function readWithPagination(title, { page, limit }, token) {
    switch (title) {
        case Enum.titleUser:
            return await getValuesToDisplay(
                token,
                Enum.titleUser,
                Enum.keyUser,
                { page, limit },
                Enum.UpdateValuesUser
            );
        case Enum.titlePublication:
            return await getValuesToDisplay(
                token,
                Enum.titlePublication,
                Enum.keyPublication,
                { page, limit },
                Enum.UpdateValuesPublication
            );
        case Enum.titleGame:
            return await getValuesToDisplay(
                token,
                Enum.titleGame,
                Enum.keyGame,
                { page, limit },
                Enum.UpdateValuesGame
            );
        case Enum.titlePlatform:
            return await getValuesToDisplay(
                token,
                Enum.titlePlatform,
                Enum.keyPlatform,
                { page, limit }
            );
        case Enum.titleGenre:
            return await getValuesToDisplay(
                token,
                Enum.titleGenre,
                Enum.keyGenre,
                { page, limit }
            );
        case Enum.titleCategory:
            return await getValuesToDisplay(
                token,
                Enum.titleCategory,
                Enum.keyCategory,
                { page, limit }
            );
        case Enum.titleVideoGame:
            return await getValuesToDisplay(
                token,
                Enum.titleVideoGame,
                Enum.keyVideoGame,
                { page, limit }
            );
    }
}

/**
 *
 * @param {string} title the title of the data to read
 * @param {object} token the token to use
 *
 * @throws {Error} if the request failed
 * @returns {Promise<Array>} return the values
 */
export async function readAllValues(title, token) {
    switch (title) {
        case Enum.titlePublication:
            return await getAllValues(
                [Enum.titlePlatform, Enum.titleVideoGame],
                token
            );
        case Enum.titleGame:
            const promises = [];
            promises.push(
                getAllValues([Enum.titleUser, Enum.titlePlatform], token)
            );
            promises.push(
                getValues(Enum.titlePublication, token, {
                    getVideoGamesInfo: true,
                })
            );
            const [{ user, platform }, publication] = await Promise.all(
                promises
            );
            const publicationDisplay = modelingPublication(
                publication,
                platform
            );
            return { user, publication: publicationDisplay };
        case Enum.titleCategory:
            return await getAllValues(
                [Enum.titleGenre, Enum.titleVideoGame],
                token
            );
    }
}
