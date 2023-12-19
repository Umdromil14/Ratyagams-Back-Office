/**
 * Stringify the values of the array and add a key to each object of the array
 *
 * @param {Array} values 
 * @param {Object} key  equals to the id of the table row
 * @param {object} valuesToUpdate  object with the keys to update
 * @param {String=} valuesToUpdate.date  value inside the values array
 * @param {String=} valuesToUpdate.url  value inside the values array
 * @param {String=} valuesToUpdate.boolean  value inside the values array
 * @returns {Array} the values array with the values updated
 */
function valuesToString(values, keys, valuesToUpdate = undefined) {
    values.forEach((value) => {
        if (valuesToUpdate !== undefined) {
            if (valuesToUpdate.url) {
                value[valuesToUpdate.url] = (
                    <a href={value[valuesToUpdate.url]} target="_blank">
                        {value[valuesToUpdate.url]}
                    </a>
                );
            }
            if (valuesToUpdate.date) {
                if (value[valuesToUpdate.date] === null) {
                    value[valuesToUpdate.date] = "";
                } else {
                    value[valuesToUpdate.date] = new Date(
                        value[valuesToUpdate.date]
                    ).toLocaleDateString();
                }
            }
            if (valuesToUpdate.boolean) {
                value[valuesToUpdate.boolean] =
                    value[valuesToUpdate.boolean].toString();
            }
        }
        value.key = "";
        if (keys.length > 1) {
            for (const key of keys) {
                value.key += value[key] + "/";
            }
            value.key = value.key.slice(0, -1);
        } else {
            value.key += value[keys];
        }
    });
    return values;
}

/**
 * this function is used to model the data for the cascader component
 *
 * @param {Object} publication get from the API
 * @param {Object} platform get from the API
 * @returns {Array} the data model for the cascader component
 *
 * @example
 *
 * const publication = [{
 *     id: 1,
 *     name: "publication 1",
 *     platform_code: "platform 1",
 * }, {
 *     id: 2,
 *     name: "publication 2",
 *     platform_code: "platform 2",
 * }];
 * const platform = [{
 *     code: "platform 1",
 *     abbreviation: "P1",
 * }, {
 *     code: "platform 2",
 *     abbreviation: "P2",
 * }];
 * modelingPublication(publication, platform);
 * return [{
 *     value: 'platform 1',
 *     label: 'P1',
 *     children: [{
 *         value: '1',
 *         label: 'publication 1',
 *     },
 *     ...
 *     ]
 * },
 * ...
 * ]
 */
export function modelingPublication(publication, platform) {
    const publicationModal = [];
    platform.map((element) => {
        publicationModal.push({
            value: element.code,
            label: element.abbreviation,
            children: [],
        });
    });
    publication.map((element) => {
        publicationModal
            .find((elementModal) => {
                return elementModal.value === element.platform_code;
            })
            .children.push({
                value: element.id,
                label: element.name,
            });
    });
    publicationModal.forEach((element) => {
        if (element.children.length === 0) {
            element.disabled = true;
        }
    });
    return publicationModal;
}
export default valuesToString;
