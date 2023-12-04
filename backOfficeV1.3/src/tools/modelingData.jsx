/**
 *
 * @param {Array} values
 * @param {Object} key -> equals to the id of the table row
 * @param {String} date -> value inside the values array
 * @param {String} url -> value inside the values array
 * @param {String} boolean -> value inside the values array
 * @returns
 */
function modelingData(
    values,
    keys,
    date = undefined,
    url = undefined,
    boolean = undefined
) {
    values.forEach((element) => {
        if (url) {
            element[url] = <a href={element[url]}>{element[url]}</a>;
        }
        if (date) {
            element[date] = new Date(element[date]).toLocaleDateString();
        }
        if (boolean) {
            element[boolean] = element[boolean].toString();
        }
        element.key = "";
        for (const key in keys) {
            element.key += element[keys[key]];
        }
    });
    return values;
}

export default modelingData;
