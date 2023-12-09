import { postValues } from "./APIAccess";
import * as Enum from "../constants/enum";

async function postData(title, ref, token) {
    try {
        switch (title) {
            case Enum.titleUser:
                await postValues(Enum.titleUser, token, {
                    email: ref.email.value,
                    password: ref.password.value,
                    username: ref.username.value,
                    firstname: ref.firstname.value ? ref.firstname.value : null,
                    lastname: ref.lastname.value ? ref.lastname.value : null,
                    is_admin: ref.is_admin,
                });
                break;
            case Enum.titlePublication:
                await postValues(Enum.titlePublication, token, {
                    ...ref,
                    store_page_url: ref.store_page_url.value
                        ? ref.store_page_url.value
                        : null,
                });
                break;
            case Enum.titleGame:
                await postValues(Enum.titleGame, token, {
                    ...ref,
                    review_comment: ref.review_comment.value
                        ? ref.review_comment.value
                        : null,
                });
                break;
            case Enum.titleGenre:
                await postValues(Enum.titleGenre, token, {
                    name: ref.name.value,
                    description: ref.description.value,
                });
                break;
            case Enum.titlePlatform:
                await postValues(Enum.titlePlatform, token, {
                    code: ref.code.value,
                    description: ref.description.value,
                    abbreviation: ref.abbreviation.value,
                });
                break;
            case Enum.titleCategory:
                await postValues(Enum.titleCategory, token, ref);
                break;
            case Enum.titleVideoGame:
                await postValues(Enum.titleVideoGame, token, {
                    name: ref.name.value,
                    description: ref.description.value,
                });
                break;
        }
    } catch (error) {
        throw error.response;
    }
}

export default postData;
