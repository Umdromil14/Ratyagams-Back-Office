export const KEY_PUBLICATION = ["id"];
export const UPDATE_VALUES_PUBLICATION = {
    date: "release_date",
    url: "store_page_url",
};
export const KEY_GAME = ["user_id", "publication_id"];
export const UPDATE_VALUES_GAME = { date: "review_date", boolean: "is_owned" };
export const KEY_PLATFORM = ["code"];

export const KEY_USER = ["id"];
export const UPDATE_VALUES_USER = { boolean: "is_admin" };

export const KEY_CATEGORY = ["genre_id", "video_game_id"];

export const KEY_VIDEOGAME = ["id"];

export const KEY_GENRE = ["id"];

export const TITLE_USER = "user";
export const TITLE_PUBLICATION = "publication";
export const TITLE_GAME = "game";
export const TITLE_PLATFORM = "platform";
export const TITLE_GENRE = "genre";
export const TITLE_CATEGORY = "category";
export const TITLE_VIDEO_GAME = "videoGame";
export const TITLE_USER_WITH_GAME = "userWithGames";
export const TITLE_PLATFORM_WITH_VIDEO_GAMES = "platformWithVideoGames";

export const BASE_URL = "http://localhost:3001/";
export const VERSIONNING = "v1/"
