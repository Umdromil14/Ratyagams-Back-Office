export const keyPublication = ["id"];
export const UpdateValuesPublication = {
    date: "release_date",
    url: "store_page_url",
};
export const keyGame = ["user_id", "publication_id"];
export const UpdateValuesGame = { date: "review_date", boolean: "is_owned" };
export const keyPlatform = ["code"];

export const keyUser = ["id"];
export const UpdateValuesUser = { boolean: "is_admin" };

export const keyCategory = ["genre_id", "video_game_id"];

export const keyVideoGame = ["id"];

export const keyGenre = ["id"];

export const titleUser = "user";
export const titlePublication = "publication";
export const titleGame = "game";
export const titlePlatform = "platform";
export const titleGenre = "genre";
export const titleCategory = "category";
export const titleVideoGame = "videoGame";

export const baseUrl = "http://localhost:3001/";
