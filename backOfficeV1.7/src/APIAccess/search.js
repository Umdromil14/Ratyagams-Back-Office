import * as Enum from "../constants/enum";
import { modelingPublication } from "../tools/valuesToString";
import { getValues } from "./APIAccess";


/**
 * this function is used to get data in the database for the search bar
 * 
 * @param {string} title the title of the data to read 
 * @param {string} value the value to search
 * @param {object} token the token of the user 
 * 
 * @throws {Error} if the request failed
 * 
 * @returns {Promise<Array>} return an array of object with the values
 */
export async function getSearchValues(title, value, token) {
    switch (title) {
        case Enum.titleUser:
            return await getValues("user", token, { username: value });
        case Enum.titleVideoGame:
            return await getValues("videogame", token, { name: value });
        case Enum.titlePublication:
            const promises = [];
            promises.push(getValues(Enum.titlePlatform, token));
            promises.push(
                getValues(Enum.titlePublication, token, {
                    getVideoGamesInfo: true,
                    videoGameName: value,
                })
            );
            const [platform, publication] = await Promise.all(promises);
            return modelingPublication(publication, platform);
    }
}
