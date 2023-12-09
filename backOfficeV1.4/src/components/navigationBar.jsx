import { Menu } from "antd";
import React, { useState, useRef } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import "../css/AdminView.css";
import { getValuesToDisplay, getValues } from "../APIAccess/APIAccess";
import * as Enum from "../constants/enum"

const search = "TYPE OF THE SEARCH : READ ALL";
/**
 * creating the navigation bar for the admin view
 *
 * @param {function} setValues - function to set the values of the table
 * @param {object} token - token to access the API
 *
 * @returns {JSX.Element} - the navigation bar
 */
function navigationBar(
    setValues,
    token,
    handleErrors,
    setError,
    openModal,
    setRef,
    setData,
    page,
    limit,
    setCount,
    setTitlePagination
) {
    const [current, setCurrent] = useState("user");
    const [title, setTitle] = useState("WELCOME TO THE ADMIN VIEW");
    const handleClick = (e) => {
        setCurrent(e.key);
    };
    const boucle = async (platform, videoGame) => {
        let publication = [];
        for (let i = 0; i < platform.length; i++) {
            publication[i] = new Object();
            publication[i].label = platform[i].code;
            publication[i].value = platform[i].code;
            publication[i].children = await getValues(
                "http://localhost:3001/publication",
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
    };

    const adminPossibilities = [
        {
            label: "Publication",
            key: "Publication",
            icon: <DownCircleOutlined />,
            children: [
                {
                    label: "Create & Read",
                    type: "group",
                    children: [
                        {
                            label: "create a publication",
                            key: "createPublication",
                            onClick: async () => {
                                setTitle("CREATE A PUBLICATION");
                                setRef({
                                    platform_code: null,
                                    video_game_id: null,
                                    release_date: null,
                                    release_price: null,
                                    store_page_url: null,
                                });
                                const platform = await getValues(
                                    "http://localhost:3001/platform",
                                    token
                                );
                                const videoGame = await getValues(
                                    "http://localhost:3001/videoGame",
                                    token
                                );
                                setData({ platform, videoGame });
                                openModal("publication");
                            },
                        },
                        {
                            label: "read all publication",
                            key: "readAllPublication",
                            onClick: async () => {
                                const countPublication = await getValues(
                                    "http://localhost:3001/publication/count",
                                    token
                                );
                                setCount(countPublication);
                                setError(false);
                                setTitle(`${search} PUBLICATIONS`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        "http://localhost:3001/publication",
                                        handleErrors,
                                        Enum.keyPublication,
                                        { page, limit },
                                        Enum.UpdateValuesPublication
                                    )
                                );
                                setTitlePagination("PUBLICATIONS");
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: "Games",
            key: "Games",
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: "create a game",
                            key: "createGame",
                            onClick: async () => {
                                setTitle("CREATE A GAME");
                                setRef({
                                    user_id: null,
                                    publication_id: null,
                                    is_owned: null,
                                    review_date: null,
                                    review_comment: null,
                                    review_rating: null,
                                });
                                const videoGame = await getValues(
                                    "http://localhost:3001/videoGame",
                                    token
                                ); // à mettre dans un slice pour pouvoir le réutiliser
                                const platform = await getValues(
                                    "http://localhost:3001/platform",
                                    token
                                );
                                const users = await getValues(
                                    "http://localhost:3001/user",
                                    token
                                );

                                const publication = await boucle(
                                    platform,
                                    videoGame
                                );
                                setData({
                                    publication,
                                    users,
                                });
                                openModal("game");
                            },
                        },
                        {
                            label: "read all games",
                            key: "readAllGame",
                            onClick: async () => {
                                const countGame = await getValues(
                                    "http://localhost:3001/game/count",
                                    token
                                );
                                setCount(countGame);
                                setError(false);
                                setTitle(`${search} GAMES`);
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
                                setTitlePagination("GAMES");
                            },
                        },
                    ],
                },
                {
                    type: "group",
                    label: "Transaction",
                    children: [
                        {
                            label: "insert a user with some games",
                            key: "insertUserWithGame",
                            onClick: () => {
                                setTitle("INSERT A USER WITH SOME GAMES");
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: "Platform",
            key: "Platform",
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: "create a platform",
                            key: "createPlatform",
                            onClick: () => {
                                setTitle("CREATE A PLATFORM");
                                setRef({
                                    code: null,
                                    description: null,
                                    abbreviation: null,
                                });
                                openModal("platform");
                            },
                        },
                        {
                            label: "read all platforms",
                            key: "readAllPlatform",
                            onClick: async () => {
                                const countPlatform = await getValues(
                                    "http://localhost:3001/platform/count",
                                    token
                                );
                                setCount(countPlatform);
                                setError(false);
                                setTitle(`${search} PLATFORMS`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        "http://localhost:3001/platform",
                                        handleErrors,
                                        Enum.keyPlatform,
                                        { page, limit }
                                    )
                                );
                                setTitlePagination("PLATFORMS");
                            },
                        },
                    ],
                },
                {
                    type: "group",
                    label: "Transaction",
                    children: [
                        {
                            label: "insert a platform with some games",
                            key: "insertPlatformWithGame",
                            onClick: () => {
                                setTitle("INSERT A PLATFORM WITH SOME GAMES");
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: "User",
            key: "User",
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: "create a user",
                            key: "createUser",
                            onClick: () => {
                                setTitle("CREATE A USER");
                                setRef({
                                    username: null,
                                    email: null,
                                    password: null,
                                    firstname: null,
                                    lastname: null,
                                });
                                openModal("user");
                            },
                        },
                        {
                            label: "read all users",
                            key: "readAllUser",
                            onClick: async () => {
                                const countUser = await getValues(
                                    "http://localhost:3001/user/count",
                                    token
                                );
                                setCount(countUser);
                                setError(false);
                                setTitle(`${search} USERS`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        "http://localhost:3001/user",
                                        handleErrors,
                                        Enum.keyUser,
                                        { page, limit },
                                        Enum.UpdateValuesUser,
                                    )
                                );
                                setTitlePagination("USERS");
                            },
                        },
                    ],
                },
                {
                    type: "group",
                    label: "transaction",
                    children: [
                        {
                            label: "insert a user with some games",
                            key: "insertOneUserWithGame",
                            onClick: () => {
                                setTitle("INSERT A USER WITH SOME GAMES");
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: "Category",
            key: "Category",
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: "create a category",
                            key: "createCategory",
                            onClick: async () => {
                                setTitle("CREATE A CATEGORY");
                                setRef({
                                    genre_id: null,
                                    video_game_id: null,
                                });
                                const genre = await getValues(
                                    "http://localhost:3001/genre",
                                    token
                                );
                                const videoGame = await getValues(
                                    "http://localhost:3001/videoGame",
                                    token
                                );
                                setData({ genre, videoGame });
                                openModal("category");
                            },
                        },
                        {
                            label: "read all categories",
                            key: "readAllCategory",
                            onClick: async () => {
                                const countCategory = await getValues(
                                    "http://localhost:3001/category/count",
                                    token
                                );
                                setCount(countCategory);
                                setError(false);
                                setTitle(`${search} CATEGORIES`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        "http://localhost:3001/category",
                                        handleErrors,
                                        Enum.keyCategory,
                                        { page, limit }
                                    )
                                );
                                setTitlePagination("CATEGORIES");
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: "Video games",
            key: "Video games",
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: "create a video game",
                            key: "createVideoGame",
                            onClick: () => {
                                setTitle("CREATE A VIDEO GAME");
                                setRef({
                                    name: null,
                                    description: null,
                                });
                                openModal("videoGame");
                            },
                        },
                        {
                            label: "read all video games",
                            key: "readAllVideoGame",
                            onClick: async () => {
                                const countVideoGame = await getValues(
                                    "http://localhost:3001/videoGame/count",
                                    token
                                );
                                setCount(countVideoGame);
                                setError(false);
                                setTitle(`${search} VIDEO GAMES`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        "http://localhost:3001/videoGame",
                                        handleErrors,
                                        Enum.keyVideoGame,
                                        { page, limit }
                                    )
                                );
                                setTitlePagination("VIDEO GAMES");
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: "Genre",
            key: "Genre",
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: "create a genre",
                            key: "createGenre",
                            onClick: () => {
                                setTitle("CREATE A GENRE");
                                setRef({
                                    name: null,
                                    description: null,
                                });
                                openModal("genre");
                            },
                        },
                        {
                            label: "read all genres",
                            key: "readAllGenre",
                            onClick: async () => {
                                const countGenre = await getValues(
                                    "http://localhost:3001/genre/count",
                                    token
                                );
                                setCount(countGenre);
                                setError(false);
                                setTitle(`${search} GENRES`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        "http://localhost:3001/genre",
                                        handleErrors,
                                        Enum.keyGenre,
                                        { page, limit }
                                    )
                                );
                                setTitlePagination("GENRES");
                            },
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div>
            <Menu
                className="navBar"
                onClick={handleClick}
                mode="horizontal"
                style={{ color: "white" }}
                items={adminPossibilities}
                selectedKeys={[current]}
            />
            <h2 id="titleView">{title}</h2>
        </div>
    );
}

export default navigationBar;
