import { getValues } from "../APIAccess/APIAccess";
/**
 *
 * @param {Array} values
 * @param {Object} key -> equals to the id of the table row
 * @param {String} date -> value inside the values array
 * @param {String} url -> value inside the values array
 * @param {String} boolean -> value inside the values array
 * @returns
 */
function modelingData(values, keys, valuesToUpdate = undefined) {
    values.forEach((element) => {
        if (valuesToUpdate !== undefined) {
            if (valuesToUpdate.url !== undefined) {
                element[valuesToUpdate.url] = (
                    <a href={element[valuesToUpdate.url]}>
                        {element[valuesToUpdate.url]}
                    </a>
                );
            }
            if (valuesToUpdate.date !== undefined) {
                element[valuesToUpdate.date] = new Date(
                    element[valuesToUpdate.date]
                ).toLocaleDateString();
            }
            if (valuesToUpdate.boolean !== undefined) {
                element[valuesToUpdate.boolean] =
                    element[valuesToUpdate.boolean].toString();
            }
        }
        element.key = "";
        for (const key in keys) {
            element.key += element[keys[key]];
        }
    });
    return values;
}

export async function modelingVideoGamesPerPlatform(token,platform, videoGame) {
    let publication = [];
    for (let i = 0; i < platform.length; i++) {
        publication[i] = new Object();
        publication[i].label = platform[i].code;
        publication[i].value = platform[i].code;
        publication[i].children = await getValues(
            "publication",
            token,
            {
                platformCode: platform[i].code,
            }
        );
        if (publication[i].children !== undefined) {
            publication[i].children.forEach((element) => {
                element.value = element.id;
                element.label = videoGame.find(
                    (videoGameElement) =>
                        videoGameElement.id === element.video_game_id
                ).name;
            });
        } else {
            publication[i].disabled = true;
        }
    }
    return publication;
}
export default modelingData;
