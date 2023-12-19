import * as Enum from "../constants/enum";
import { modelingPublication } from "../tools/valuesToString";
import { getValues } from "./APIAccess";

/**
 * Get the values of the search bar
 *
 * @param {string} title the title of the data to read
 * @param {string} value the value to search
 * @param {object} token the token of the user
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<object[]>} a promise with an array of values
 */
export async function getSearchValues(title, value, token, rowValues = {}) {
    const addActiveId = async (values, activeId, url, params) => {
        if (activeId && !values.some((value) => value.id === activeId)) {
            const value = (await getValues(url, token, params))[0];
            values.push(value);
        }
        return values;
    };

    switch (title) {
        case Enum.TITLE_USER:
            let users = await getValues(Enum.TITLE_USER, token, {
                username: value,
            });
            users = await addActiveId(
                users,
                rowValues.user_id,
                Enum.TITLE_USER,
                {
                    id: rowValues.user_id,
                }
            );

            return { users };
        case Enum.TITLE_VIDEO_GAME:
            let videoGames = await getValues(Enum.TITLE_VIDEO_GAME, token, {
                name: value,
            });

            videoGames = await addActiveId(
                videoGames,
                rowValues.video_game_id,
                Enum.TITLE_VIDEO_GAME,
                {
                    id: rowValues.video_game_id,
                }
            );
            return { videoGames };
        case Enum.TITLE_PUBLICATION:
            const promises = [];
            promises.push(
                getValues(Enum.TITLE_PLATFORM, token),
                getValues(Enum.TITLE_PUBLICATION, token, {
                    getVideoGamesInfo: true,
                    videoGameName: value,
                })
            );
            let [platforms, publications] = await Promise.all(promises);

            publications = await addActiveId(
                publications,
                rowValues.publication_id,
                Enum.TITLE_PUBLICATION,
                {
                    publicationId: rowValues.publication_id,
                    getVideoGamesInfo: true,
                }
            );

            publications = modelingPublication(
                publications,
                platforms
            );
            return { publications };
    }
}
