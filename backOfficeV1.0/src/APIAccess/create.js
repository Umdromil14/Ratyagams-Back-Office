import { postValues } from "./APIAccess";
import * as Enum from "../constants/enum";
import dayjs from "dayjs";

/**
 * Post values in the database
 *
 * @param {string} title the title of the table
 * @param {FormInstance} form the form with the values to post
 * @param {object} token the token of the user
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<void>}
 */
export default async function post(title, form, token) {
    const formData = new FormData();
    switch (title) {
        case Enum.TITLE_GENRE:
        case Enum.TITLE_VIDEO_GAME:
        case Enum.TITLE_PLATFORM:
            formData.append(
                "description",
                form.description ? form.description : ""
            );
            formData.append("picture", form.picture);
            if (title === Enum.TITLE_PLATFORM) {
                formData.append("code", form.code ? form.code : "");
                formData.append(
                    "abbreviation",
                    form.abbreviation ? form.abbreviation : ""
                );
            } else {
                formData.append("name", form.name ? form.name : "");
            }
            await postValues(title, token, formData);
            break;
        case Enum.TITLE_USER:
            await postValues(Enum.TITLE_USER, token, {
                ...form,
                firstname: form.firstname || null,
                lastname: form.lastname || null,
            });
            break;
        case Enum.TITLE_PUBLICATION:
            await postValues(Enum.TITLE_PUBLICATION, token, {
                ...form,
                release_date: form.release_date ? dayjs(form.release_date).format("YYYY-MM-DD") : undefined,
                store_page_url: form.store_page_url || null,
            });
            break;
        case Enum.TITLE_GAME:
            await postValues(Enum.TITLE_GAME, token, {
                ...form,
                publication_id: form.publication_id[1],
                review_date: form.review_date
                    ? dayjs(form.review_date).format("YYYY-MM-DD")
                    : null,
                review_comment: form.review_comment || null,
            });
            break;
        case Enum.TITLE_USER_WITH_GAME:
            await postValues(`user/insertWithGames`, token, {
                ...form,
                firstname: form.firstname || null,
                lastname: form.lastname || null,
                publications_ids: form.publications_ids.map(
                    (publication) => publication[1]
                ),
            });
            break;
        case Enum.TITLE_PLATFORM_WITH_VIDEO_GAMES:
            const videoGamesInfo = [];
            formData.append("code", form.code ? form.code : "");
            formData.append(
                "description",
                form.description ? form.description : ""
            );
            formData.append(
                "abbreviation",
                form.abbreviation ? form.abbreviation : ""
            );
            formData.append(
                "platformPicture",
                form.platformPicture ? form.platformPicture : null
            );
            form.video_games.forEach((videoGame) => {
                const { videoGamePicture, ...videoGameData } = videoGame;
                videoGameData.release_date = videoGameData.release_date
                    ? dayjs(videoGameData.release_date).format("YYYY-MM-DD")
                    : undefined;
                videoGameData.store_page_url =
                    videoGameData.store_page_url || null;
                formData.append("videoGamesPictures", videoGamePicture);
                videoGamesInfo.push(videoGameData);
            });
            formData.append("video_games", JSON.stringify(videoGamesInfo));
            await postValues(`platform/withVideoGames`, token, formData);
            break;
        default:
            await postValues(title, token, form);
    }
}
