import axios from "axios";

async function getValues(token,url) {
    try {
        const result = await axios.get(url, token);
        //set a unique key for each element
        return result.data;
    } catch (error) {
        throw error.response.status;
        //send error number to the onclick function
    }
}
export default getValues;
