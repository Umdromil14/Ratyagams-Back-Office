import { postValues } from "../APIAccess/APIAccess";

async function postData(title, ref, token) {
    switch (title) {
        case "user":
            postValues("user", token, {
                email: ref.email.value,
                password: ref.password.value,
                username: ref.username.value,
                firstname: ref.firstname.value ? ref.firstname.value : null,
                lastname: ref.lastname.value ? ref.lastname.value : null,
                is_admin: ref.is_admin,
            });
            break;
        case "publication":
            postValues("publication", token, {
                ...ref,
                store_page_url: ref.store_page_url.value,
            });
            break;
        case "game":
            postValues("game", token, {
                ...ref,
                review_comment: ref.review_comment.value,
            });
            break;
        case "genre":
            postValues("genre", token, {
                name: ref.name.value,
                description: ref.description.value,
            });
            break;
        case "platform":
            postValues("platform", token, {
                code: ref.code.value,
                description: ref.description.value,
                abbreviation: ref.abbreviation.value,
            });
            break;
        case "category":
            postValues("category", token, ref);
            break;
        case "videoGame":
            postValues("videoGame", token, {
                name: ref.name.value,
                description: ref.description.value,
            });
            break;
    }
}

export default postData;
