import { postValues } from "./APIAccess";
import * as Enum from "../constants/enum";

/**
 * function used to post date depending on the title
 *
 * @param {string} title the title of the data to post
 * @param {FormData} form the form to post
 * @param {string} token the token to use
 * @throws {Error} throw an error if it failed
 *
 * @returns {Promise<void>}
 */
async function postForm(title, form, token) {
    switch (title) {
        case Enum.titleUser:
            await postValues(Enum.titleUser, token, {
                username: form.get("username"),
                password: form.get("password"),
                email: form.get("email"),
                firstname: form.get("firstname"),
                lastname: form.get("lastname"),
                is_admin: form.get("is_admin") === "true",
            });
            break;
        case Enum.titlePublication:
            await postValues(Enum.titlePublication, token, {
                platform_code: form.get("platform_code"),
                video_game_id: parseInt(form.get("video_game_id")),
                release_date: form.get("release_date"),
                release_price: parseInt(form.get("release_price")),
                store_page_url: form.get("store_page_url"),
            });
            break;
        case Enum.titleGame:
            await postValues(Enum.titleGame, token, {
                user_id: parseInt(form.get("user_id")),
                publication_id: parseInt(form.get("publication_id")),
                is_owned: form.get("is_owned") === "true",
                release_date: form.get("release_date"),
                review_rating: parseInt(form.get("review_rating")),
                review_comment: form.get("review_comment"),
            });
            break;
        case Enum.titleGenre:
            await postValues(Enum.titleGenre, token, {
                name: form.get("name"),
                description: form.get("description"),
                picture: form.get("picture"),
            });
            break;
        case Enum.titlePlatform:
            await postValues(Enum.titlePlatform, token, {
                code: form.get("code"),
                description: form.get("description"),
                abbreviation: form.get("abbreviation"),
                picture: form.get("picture"),
            });
            break;
        case Enum.titleCategory:
            await postValues(Enum.titleCategory, token, {
                video_game_id: parseInt(form.get("video_game_id")),
                genre_id: parseInt(form.get("genre_id")),
            });
            break;
        case Enum.titleVideoGame:
            await postValues(Enum.titleVideoGame, token, {
                name: form.get("name"),
                description: form.get("description"),
                picture: form.get("picture"),
            });
            break;
    }
}

export default postForm;
