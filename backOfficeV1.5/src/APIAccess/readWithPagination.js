import { getValuesToDisplay } from "./APIAccess";
import * as Enum from "../constants/enum";
export async function readWithPagination(
    title,
    setValues,
    page,
    limit,
    handleErrors,
    token
) {
    switch (title) {
        case Enum.titleUser:
            setValues(
                await getValuesToDisplay(
                    token,
                    Enum.titleUser,
                    handleErrors,
                    Enum.keyUser,
                    { page, limit },
                    Enum.UpdateValuesUser
                )
            );
            break;
        case Enum.titlePublication:
            setValues(
                await getValuesToDisplay(
                    token,
                    Enum.titlePublication,
                    handleErrors,
                    Enum.keyPublication,
                    { page, limit },
                    Enum.UpdateValuesPublication
                )
            );
            break;
        case Enum.titleGame:
            setValues(
                await getValuesToDisplay(
                    token,
                    Enum.titleGame,
                    handleErrors,
                    Enum.keyGame,
                    { page, limit },
                    Enum.UpdateValuesGame
                )
            );
            break;
        case Enum.titlePlatform:
            setValues(
                await getValuesToDisplay(
                    token,
                    Enum.titlePlatform,
                    handleErrors,
                    Enum.keyPlatform,
                    { page, limit }
                )
            );
            break;
        case Enum.titleGenre:
            setValues(
                await getValuesToDisplay(
                    token,
                    Enum.titleGenre,
                    handleErrors,
                    Enum.keyGenre,
                    { page, limit }
                )
            );
            break;
        case Enum.titleCategory:
            setValues(
                await getValuesToDisplay(
                    token,
                    Enum.titleCategory,
                    handleErrors,
                    Enum.keyCategory,
                    { page, limit }
                )
            );
            break;
        case Enum.titleVideoGame:
            setValues(
                await getValuesToDisplay(
                    token,
                    Enum.titleVideoGame,
                    handleErrors,
                    Enum.keyVideoGame,
                    { page, limit }
                )
            );
            break;
    }
}
