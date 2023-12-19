import { getAllValues, getValuesToDisplay, getValues } from "./APIAccess";
import * as Enum from "../constants/enum";
import { modelingPublication } from "../tools/valuesToString";

/**
 * Read the values to display in the table, depending on the title and the parameters
 *
 * @param {string} title the title of the table
 * @param {object} params the parameters to use
 * @param {number} params.page the selected page to display
 * @param {number} params.limit the selected limit of values to display
 * @param {object} token the admin token
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<Array>} return a promise with an array of values
 *
 */
export async function readWithPagination(title, { page, limit }, token) {
    switch (title) {
        case Enum.TITLE_USER:
            return await getValuesToDisplay(
                token,
                Enum.TITLE_USER,
                Enum.KEY_USER,
                { page, limit },
                Enum.UPDATE_VALUES_USER
            );
        case Enum.TITLE_PUBLICATION:
            return await getValuesToDisplay(
                token,
                Enum.TITLE_PUBLICATION,
                Enum.KEY_PUBLICATION,
                { page, limit },
                Enum.UPDATE_VALUES_PUBLICATION
            );
        case Enum.TITLE_GAME:
            return await getValuesToDisplay(
                token,
                Enum.TITLE_GAME,
                Enum.KEY_GAME,
                { page, limit },
                Enum.UPDATE_VALUES_GAME
            );
        case Enum.TITLE_PLATFORM:
            return await getValuesToDisplay(
                token,
                Enum.TITLE_PLATFORM,
                Enum.KEY_PLATFORM,
                { page, limit }
            );
        case Enum.TITLE_GENRE:
            return await getValuesToDisplay(
                token,
                Enum.TITLE_GENRE,
                Enum.KEY_GENRE,
                { page, limit }
            );
        case Enum.TITLE_CATEGORY:
            return await getValuesToDisplay(
                token,
                Enum.TITLE_CATEGORY,
                Enum.KEY_CATEGORY,
                { page, limit }
            );
        case Enum.TITLE_VIDEO_GAME:
            return await getValuesToDisplay(
                token,
                Enum.TITLE_VIDEO_GAME,
                Enum.KEY_VIDEOGAME,
                { page, limit }
            );
    }
}

/**
 * Read all the values needed for the form
 *
 * @param {string} title the title of the modal
 * @param {object} token the admin token
 * @param {object=} rowValues the values of the row
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<Array>} return a promise with an array of values
 */
export async function readAllValues(title, token, rowValues = {}) {
    const getImage = async (imageName) => {
        const image = await getValues(
            `${title}/${imageName}.png`,
            token,
            undefined,
            "blob"
        );
        return { image };
    };
    const addActiveId = async (values, activeId, url, params) => {
        if (activeId && !values.some((value) => value.id === activeId)) {
            const value = (await getValues(url, token, params))[0];
            values.push(value);
        }
        return values;
    };

    if (title === Enum.TITLE_PUBLICATION) {
        let { platform: platforms, videoGame: videoGames } = await getAllValues(
            [Enum.TITLE_PLATFORM, Enum.TITLE_VIDEO_GAME],
            token
        );

        videoGames = await addActiveId(
            videoGames,
            rowValues.video_game_id,
            Enum.TITLE_VIDEO_GAME,
            {
                id: rowValues.video_game_id,
            }
        );

        return { platforms, videoGames };
    }

    if (title === Enum.TITLE_GAME) {
        const promises = [];
        promises.push(
            getAllValues([Enum.TITLE_USER, Enum.TITLE_PLATFORM], token),
            getValues(Enum.TITLE_PUBLICATION, token, {
                getVideoGamesInfo: true,
            })
        );
        let [{ user: users, platform: platforms }, publications] =
            await Promise.all(promises);

        publications = await addActiveId(
            publications,
            rowValues.publication_id,
            Enum.TITLE_PUBLICATION,
            {
                publicationId: rowValues.publication_id,
                getVideoGamesInfo: true,
            }
        );

        users = await addActiveId(users, rowValues.user_id, "user", {
            id: rowValues.user_id,
        });

        publications = modelingPublication(publications, platforms);
        return { users, publications };
    }

    if (title === Enum.TITLE_CATEGORY) {
        let { genre: genres, videoGame: videoGames } = await getAllValues(
            [Enum.TITLE_GENRE, Enum.TITLE_VIDEO_GAME],
            token
        );

        videoGames = await addActiveId(
            videoGames,
            rowValues.video_game_id,
            "videoGame",
            {
                id: rowValues.video_game_id,
            }
        );

        return { genres, videoGames };
    }

    if (title === Enum.TITLE_USER_WITH_GAME) {
        const promisesUser = [];
        promisesUser.push(
            getValues(Enum.TITLE_PLATFORM, token),
            getValues(Enum.TITLE_PUBLICATION, token, {
                getVideoGamesInfo: true,
            })
        );
        const [platforms, publications] = await Promise.all(promisesUser);
        const publicationDisplayTransaction = modelingPublication(
            publications,
            platforms
        );
        return { publications: publicationDisplayTransaction };
    }

    if (
        title === Enum.TITLE_GENRE ||
        title === Enum.TITLE_VIDEO_GAME ||
        title === Enum.TITLE_PLATFORM
    ) {
        if (Object.keys(rowValues).length !== 0) {
            if (title === Enum.TITLE_PLATFORM) {
                return getImage(rowValues.code);
            }
            return getImage(rowValues.id);
        }
    }
}
