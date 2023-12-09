import { getValuesToDisplay } from "../APIAccess/APIAccess";
import * as Enum from "../constants/enum";
export async function readWithPagination(title, setValues, page, limit,handleErrors,token) {
    switch (title) {
        case "USERS":
            setValues(
                await getValuesToDisplay(
                    token,
                    "http://localhost:3001/user",
                    handleErrors,
                    Enum.keyUser,
                    { page, limit },
                    Enum.UpdateValuesUser
                )
            );
            break;
        case "PUBLICATIONS":
            break;
        case "GAMES":
            setValues(
                await getValuesToDisplay(
                    token,
                    "http://localhost:3001/game",
                    handleErrors,
                    Enum.keyGame,
                    { page, limit },
                    Enum.UpdateValuesGame
                )
            );
            break;
        case "PLATFORMS":
            break;
        case "GENRES":
            break;
        case "CATEGORIES":
            break;
        case "VIDEO GAMES":
            break;
    }
}
