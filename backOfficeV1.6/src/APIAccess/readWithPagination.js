import { getValuesToDisplay } from "./APIAccess";
import * as Enum from "../constants/enum";

/**
 * this function is used to read data in the database
 *
 * @param {string} title - The title of the data to read
 * @param {function} setValues - The function to set the values
 * @param {number} page - The page to display
 * @param {number} limit - The limit of data to display
 * @param {string} token - The token of the user
 * @returns {Array} return an array of object with the values
 */
export async function readWithPagination(
    title,
    { page, limit },
    token
) {
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
