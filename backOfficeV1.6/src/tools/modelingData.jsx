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
                    <a href={element[valuesToUpdate.url]} target="_blank">
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

// const options = 

/**
 * this function is used to model the data for the cascader component
 *
 * @param {Object} publication get from the API
 * @param {Object} platform get from the API
 * @returns {Array} the data model for the cascader component
 *
 * @example
 *
 * const publication = [
 *   {
 *     id: 1,
 *     name: "publication 1",
 *     platform_code: "platform 1",
 *   },
 *   {
 *   id: 2,
 *   name: "publication 2",
 *   platform_code: "platform 2",
 * }];
 * const platform = [
 *  {
 *   code: "platform 1",
 *   abbreviation: "P1",
 *  },
 *  {
 *   code: "platform 2",
 *   abbreviation: "P2",
 *  }];
 * modelingPublication(publication, platform);
 * return [
 *    {
 *       value: 'platform 1',
 *       label: 'P1',
 *       children: [
 *         {
 *           value: '1',
 *           label: 'publication 1',
 *         },
 *       ],
 *     },
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
export default modelingData;
