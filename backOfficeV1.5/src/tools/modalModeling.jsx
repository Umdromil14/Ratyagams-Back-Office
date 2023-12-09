import InputWithLabel from "../components/form/InputWithLabel";
import RadioButton from "../components/form/RadioButton";
import ScrollDown from "../components/form/ScrollDown";
import Date from "../components/form/DatePicker";
import inputForNumber from "../components/form/InputNumber";
import MultipleScrollDown from "../components/form/Cascader";
import "../css/modal.css";
import * as Enum from "../constants/enum";

function modalModeling(title, data, ref) {
    switch (title) {
        case Enum.titlePublication:
            return publicationModal(ref, data);
        case Enum.titleGame:
            return gameModal(ref, data);
        case Enum.titlePlatform:
            return platformModal(ref);
        case Enum.titleUser:
            return userModal(ref);
        case Enum.titleCategory:
            return categoryModal(ref, data);
        case Enum.titleVideoGame:
            return videoGameModal(ref);
        case Enum.titleGenre:
            return genreModal(ref);
    }
}

function userModal(userInformations) {
    return (
        <div className="divModal">
            {InputWithLabel(
                { label: "Username", Required: true },
                {
                    type: "text",
                    id: "username",
                    ref: (username) => (userInformations.username = username),
                },
                { label: "labelModal", input: "inputModal" },
                "Username"
            )}
            {InputWithLabel(
                { label: "Email", Required: true },
                {
                    type: "text",
                    id: "email",
                    ref: (mail) => (userInformations.email = mail),
                },
                { label: "labelModal", input: "inputModal" },
                "Email"
            )}
            {InputWithLabel(
                { label: "Password", Required: true },
                {
                    type: "password",
                    id: "password",
                    ref: (password) => (userInformations.password = password),
                },
                { label: "labelModal", input: "inputModal" },
                "Password"
            )}
            {InputWithLabel(
                { label: "Firstname" },
                {
                    type: "text",
                    id: "firstname",
                    ref: (firstname) =>
                        (userInformations.firstname = firstname),
                },
                { label: "labelModal", input: "inputModal" },
                "Firstname"
            )}
            {InputWithLabel(
                { label: "Lastname", Required: false },
                {
                    type: "text",
                    id: "lastname",
                    ref: (lastname) => (userInformations.lastname = lastname),
                },
                { label: "labelModal", input: "inputModal" },
                "Lastname"
            )}
            {RadioButton(
                { label: "Admin" },
                {
                    1: "User",
                    2: "Admin",
                },
                (value) => {
                    userInformations.is_admin = value.target.value === "2";
                }
            )}
        </div>
    );
}

function gameModal(gameInformations, data) {
    const { user, publication } = data;
    return (
        <>
            {ScrollDown(
                { label: "select a user", Required: true },
                user,
                (value) => {
                    gameInformations.user_id = value;
                },
                "select a username",
                {
                    label: "username",
                    value: "id",
                }
            )}
            {MultipleScrollDown(
                { label: "select a publication", Required: true },
                "select a video game",
                publication,
                (value) => {
                    gameInformations.publication_id = value[1];
                }
            )}
            {RadioButton(
                { label: "Is owned" },
                { 1: "owned", 2: "not owned" },
                (value) => {
                    gameInformations.is_owned = value.target.value === "1";
                }
            )}

            {Date({ label: "Review date" }, (value) => {
                if (value) {
                    gameInformations.review_date = `${value.$y}-${value.$M}-${value.$D}`;
                } else {
                    gameInformations.review_date = undefined;
                }
            })}
            {inputForNumber(
                { label: "Review rating" },
                (review_rating) =>
                    (gameInformations.review_rating = review_rating),
                0,
                5,
                0
            )}

            {InputWithLabel(
                { label: "Review comment" },
                {
                    type: "text",
                    id: "review_comment",
                    ref: (review_comment) =>
                        (gameInformations.review_comment = review_comment),
                },
                { label: "labelModal", input: "inputModal" },
                "Review comment"
            )}
        </>
    );
}

function publicationModal(publicationInformations, data) {
    const { videoGame, platform } = data;
    return (
        <>
            {ScrollDown(
                { label: "select a platform", Required: true },
                platform,
                (value) => {
                    publicationInformations.platform_code = value;
                },
                "select a platform",
                {
                    label: "code",
                    value: "code",
                }
            )}
            {ScrollDown(
                { label: "select a video game", Required: true },
                videoGame,
                (value) => {
                    publicationInformations.video_game_id = value;
                },
                "select a video game",
                {
                    label: "name",
                    value: "id",
                }
            )}

            {Date({label : "Release date"}, (value) => {
                if (value) {
                    publicationInformations.release_date = `${value.$y}-${value.$M}-${value.$D}`;
                } else {
                    publicationInformations.release_date = undefined;
                }
            })}
            {inputForNumber(
                { label: "Release price" },
                (release_price) =>
                    (publicationInformations.release_price = release_price),
                0,
                100,
                0,
                0.01
            )}
            {InputWithLabel(
                { label: "Game link", Required: false },
                {
                    type: "text",
                    id: "store_page_url",
                    ref: (store_page_url) =>
                        (publicationInformations.store_page_url =
                            store_page_url),
                },
                { label: "labelModal", input: "inputModal" },
                "Store page url"
            )}
        </>
    );
}

function platformModal(platformInformations) {
    return (
        <>
            {InputWithLabel(
                { label: "Code", Required: true },
                {
                    type: "text",
                    id: "code",
                    ref: (code) => (platformInformations.code = code),
                },
                { label: "labelModal", input: "inputModal" },
                "Code"
            )}
            {InputWithLabel(
                { label: "Description", Required: true },
                {
                    type: "text",
                    id: "description",
                    ref: (description) =>
                        (platformInformations.description = description),
                },
                { label: "labelModal", input: "inputModal" },
                "Description"
            )}
            {InputWithLabel(
                { label: "Abbreviation", Required: true },
                {
                    type: "text",
                    id: "abbreviation",
                    ref: (abbreviation) =>
                        (platformInformations.abbreviation = abbreviation),
                },
                { label: "labelModal", input: "inputModal" },
                "Abbreviation"
            )}
        </>
    );
}

function categoryModal(categoryInformations, data) {
    const { videoGame, genre } = data;
    return (
        <>
            {ScrollDown(
                { label: "select a video game", Required: true },
                videoGame,
                (value) => {
                    categoryInformations.video_game_id = value;
                },
                "select a video game",
                {
                    label: "name",
                    value: "id",
                }
            )}
            {ScrollDown(
                { label: "select a genre", Required: true },
                genre,
                (value) => {
                    categoryInformations.genre_id = value;
                },
                "select a genre",
                {
                    label: "name",
                    value: "id",
                }
            )}
        </>
    );
}

function videoGameModal(videoGameInformations) {
    return (
        <>
            {InputWithLabel(
                { label: "Name", Required: true },
                {
                    type: "text",
                    id: "name",
                    ref: (name) => (videoGameInformations.name = name),
                },
                { label: "labelModal", input: "inputModal" },
                "Name"
            )}
            {InputWithLabel(
                { label: "Description", Required: true },
                {
                    type: "text",
                    id: "description",
                    ref: (description) =>
                        (videoGameInformations.description = description),
                },
                { label: "labelModal", input: "inputModal" },
                "Description"
            )}
        </>
    );
}

function genreModal(genreInformations) {
    return (
        <>
            {InputWithLabel(
                { label: "Name", Required: true },
                {
                    type: "text",
                    id: "name",
                    ref: (label) => (genreInformations.name = label),
                },
                { label: "labelModal", input: "inputModal" },
                "Name"
            )}
            {InputWithLabel(
                { label: "Description", Required: true },
                {
                    type: "text",
                    id: "description",
                    ref: (description) =>
                        (genreInformations.description = description),
                },
                { label: "labelModal", input: "inputModal" },
                "Description"
            )}
        </>
    );
}

export default modalModeling;
