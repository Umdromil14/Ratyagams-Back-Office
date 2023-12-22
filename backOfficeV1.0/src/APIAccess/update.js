import { updateValues } from "./APIAccess";
import * as Enum from "../constants/enum";
import dayjs from "dayjs";

/**
 * Update values in the database
 *
 * @param {string} title the title of the table
 * @param {object} token the token of the user
 * @param {FormInstance} form the form with the new values
 * @param {string[]} ids the ids of the row to update in order
 *
 * @throws {Error} if the request failed
 *
 * @returns {Promise<void>}
 */
export default async function update(title, token, form, ids) {
    const formData = new FormData();
    switch (title) {
        case Enum.TITLE_GENRE:
        case Enum.TITLE_VIDEO_GAME:
        case Enum.TITLE_PLATFORM:
            if (form.description){
                formData.append("description", form.description);
            }
            if (form.picture){
                formData.append("picture", form.picture);
            }
            if (title === Enum.TITLE_PLATFORM) {
                if (form.code){
                    formData.append("code", form.code);
                }
                if (form.abbreviation){
                    formData.append("abbreviation", form.abbreviation);
                }
            } else {
                if (form.name){
                    formData.append("name", form.name);
                }
            }
            await updateValues(title, token, ids, formData);
            break;
        case Enum.TITLE_GAME:
            await updateValues(Enum.TITLE_GAME, token, ids, {
                ...form,
                review_date: form.review_date
                    ? dayjs(form.review_date).format("YYYY-MM-DD")
                    : undefined,
                review_comment: form.review_comment || null,
                publication_id: form.publication_id[1],
            });
            break;
        case Enum.TITLE_PUBLICATION:
            await updateValues(Enum.TITLE_PUBLICATION, token, ids, {
                ...form,
                release_date: dayjs(form.release_date).format("YYYY-MM-DD"),
                store_page_url: form.store_page_url || null,
            });
            break;
        case Enum.TITLE_USER:
            await updateValues(Enum.TITLE_USER, token, ids, {
                ...form,
                firstname: form.firstname || null,
                lastname: form.lastname || null,
            });
            break;
        default:
            await updateValues(title, token, ids, form);
    }
}
