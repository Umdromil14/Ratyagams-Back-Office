import InputWithLabel from "../components/form/InputWithLabel";
import RadioButton from "../components/form/RadioButton";
import ScrollDown from "../components/form/ScrollDown";
import Date from "../components/form/DatePicker";
import inputForNumber from "../components/form/InputNumber";
import MultipleScrollDown from "../components/form/Cascader";

function modalModeling(title, data = undefined, ref = undefined) {
    switch (title) {
        case "publication":
            return publicationModal(ref, data);
        case "game":
            return gameModal(ref, data);
        case "platform":
            return platformModal(ref);
        case "user":
            return userModal(ref);
        case "category":
            return categoryModal(ref, data);
        case "videoGame":
            return videoGameModal(ref);
        case "genre":
            return genreModal(ref);
        default:
            return null;
    }
}

function userModal(userInformations) {
    return (
        <>
            {/* send a proper style to differ with the login label */}
            {InputWithLabel(
                { htmlFor: "username", label: "Username*" },
                {
                    type: "text",
                    id: "username",
                    ref: (username) => (userInformations.username = username),
                }
            )}
            {/* send a proper style to differ with the login label */}
            {InputWithLabel(
                { htmlFor: "email", label: "Email*" },
                {
                    type: "text",
                    id: "email",
                    ref: (mail) => (userInformations.email = mail),
                }
            )}
            {/* send a proper style to differ with the login label */}
            {InputWithLabel(
                { htmlFor: "password", label: "Password*" },
                {
                    type: "password",
                    id: "password",
                    ref: (password) => (userInformations.password = password),
                }
            )}
            {/* title for the radios button : user or admin ?
            no obligatory cause set values to false */}
            {RadioButton(
                {
                    1: "User",
                    2: "Admin",
                },
                (value) => {
                    userInformations.is_admin = value.target.value === 1;
                }
            )}
            {/* send a proper style to differ with the login label */}
            {InputWithLabel(
                { htmlFor: "firstname", label: "Firstname" },
                {
                    type: "text",
                    id: "firstname",
                    ref: (firstname) =>
                        (userInformations.firstname = firstname),
                }
            )}
            {/* send a proper style to differ with the login label */}
            {InputWithLabel(
                { htmlFor: "lastname", label: "Lastname" },
                {
                    type: "text",
                    id: "lastname",
                    ref: (lastname) => (userInformations.lastname = lastname),
                }
            )}
        </>
    );
}

function gameModal(gameInformations, data) {
    const { users, publication } = data;
    return (
        <>
            {/* send a proper style to differ with the login label 
            title for it : please select an username*/}
            {ScrollDown(
                users,
                (value) => {
                    gameInformations.user_id = value;
                },
                "select a username",
                {
                    label: "username",
                    value: "id",
                }
            )}
            {/* send a style
            title : please select a video game in the right platform*/}
            {MultipleScrollDown(publication, (value) => {
                gameInformations.publication_id = value[1];
            })}
            {/* return an array with [platformCode,publicationId] */}

            {/*really need it ? need explanation by the homies */}
            {RadioButton({ 1: "owned", 2: "not owned" }, (value) => {
                gameInformations.is_owned = value.target.value === 1;
            })}

            {/* title : please select a review date */}
            {Date((value) => {
                if (value) {
                    gameInformations.review_date = `${value.$y}-${value.$M}-${value.$D}`;
                } else {
                    gameInformations.review_date = undefined;
                }
            })}
            {/* title : please select a number between 0 and 5 */}
            {inputForNumber(
                (review_rating) =>
                    (gameInformations.review_rating = review_rating),
                0,
                5,
                0
            )}

            {/* send a proper style to differ with the login label */}
            {InputWithLabel(
                { htmlFor: "review_comment", label: "Review comment" },
                {
                    type: "text",
                    id: "review_comment",
                    ref: (review_comment) =>
                        (gameInformations.review_comment = review_comment),
                }
            )}
        </>
    );
}

function publicationModal(publicationInformations, data) {
    const { videoGame, platform } = data;
    return (
        <>
            {/* title : please select a platform */}
            {ScrollDown(
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
            {/* title : please select a video Game */}
            {ScrollDown(
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

            {/* title : please select a date when the game has been released */}
            {Date((value) => {
                if (value) {
                    publicationInformations.release_date = `${value.$y}-${value.$M}-${value.$D}`;
                } else {
                    publicationInformations.release_date = undefined;
                }
            })}
            {/* please fill the price of the game */}
            {inputForNumber(
                (release_price) =>
                    (publicationInformations.release_price = release_price),
                0,
                100,
                0,
                0.01
            )}
            {/* please fill an url */}
            {InputWithLabel(
                { htmlFor: "store_page_url", label: "Store page url" },
                {
                    type: "text",
                    id: "store_page_url",
                    ref: (store_page_url) =>
                        (publicationInformations.store_page_url =
                            store_page_url),
                }
            )}
        </>
    );
}

function platformModal(platformInformations) {
    return (
        <>
            {/* title : please provide the code of the platform (PS4 for playsation 4) */}
            {InputWithLabel(
                { htmlFor: "code", label: "Code*" },
                {
                    type: "text",
                    id: "code",
                    ref: (code) => (platformInformations.code = code),
                }
            )}
            {/* title : please provide the description of the code */}
            {InputWithLabel(
                { htmlFor: "description", label: "Description*" },
                {
                    type: "text",
                    id: "description",
                    ref: (description) =>
                        (platformInformations.description = description),
                }
            )}
            {/* title : please provide a short abbreviation for the platform */}
            {InputWithLabel(
                { htmlFor: "abbreviation", label: "Abbreviation*" },
                {
                    type: "text",
                    id: "abbreviation",
                    ref: (abbreviation) =>
                        (platformInformations.abbreviation = abbreviation),
                }
            )}
        </>
    );
}

function categoryModal(categoryInformations, data) {
    const { videoGame, genre } = data;
    return (
        <>
            {/* title for the scrollDown : please select a video Game* */}
            {ScrollDown(
                videoGame,
                (value) => {
                    categoryInformations.video_game_id = value;
                },
                "select a video game*",
                {
                    label: "name",
                    value: "id",
                }
            )}
            {/* title for the scrolldown : please select a genre* */}
            {ScrollDown(
                genre,
                (value) => {
                    categoryInformations.genre_id = value;
                },
                "select a genre*",
                {
                    label: "name",
                    value: "id",
                }
            )}
            {/* do i really need to let this ? */}
            <p>* : must be filled</p>
        </>
    );
}

function videoGameModal(videoGameInformations) {
    return (
        <>
            {/* send a proper style to differ with the login label */}

            {InputWithLabel(
                { htmlFor: "name", label: "Name*" },
                {
                    type: "text",
                    id: "name",
                    ref: (name) => (videoGameInformations.name = name),
                }
            )}
            {/* send a proper style to differ with the login label */}

            {InputWithLabel(
                { htmlFor: "description", label: "Description*" },
                {
                    type: "text",
                    id: "description",
                    ref: (description) =>
                        (videoGameInformations.description = description),
                }
            )}
        </>
    );
}

function genreModal(genreInformations) {
    return (
        <>
            {/* send a proper style to differ with the login label */}

            {InputWithLabel(
                { htmlFor: "name", label: "Name*" },
                {
                    type: "text",
                    id: "name",
                    ref: (label) => (genreInformations.name = label),
                }
            )}
            {/* send a proper style to differ with the login label */}

            {InputWithLabel(
                { htmlFor: "description", label: "Description*" },
                {
                    type: "text",
                    id: "description",
                    ref: (description) =>
                        (genreInformations.description = description),
                }
            )}
        </>
    );
}

export default modalModeling;
