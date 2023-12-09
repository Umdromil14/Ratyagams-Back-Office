import { Menu } from "antd";
import React, { useState, useRef } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import "../css/AdminView.css";
import { getValuesToDisplay, getValues } from "../APIAccess/APIAccess";
import * as Enum from "../constants/enum";
import { modelingVideoGamesPerPlatform } from "../tools/modelingData";
import { getAllValues } from "../APIAccess/APIAccess";

const search = "Type of the search : ";
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
    openModal,
    setRef,
    setData,
    setPage,
    limit,
    setCount,
    setTitlePagination
) {
    const [current, setCurrent] = useState();
    const [title, setTitle] = useState("WELCOME TO THE ADMIN VIEW");
    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const adminPossibilities = [
        {
            label: Enum.titlePublication,
            key: Enum.titlePublication,
            icon: <DownCircleOutlined />,
            children: [
                {
                    label: "Create & Read",
                    type: "group",
                    children: [
                        {
                            label: `create a ${Enum.titlePublication}`,
                            key: `create${Enum.titlePublication}`,
                            onClick: async () => {
                                setRef({
                                    platform_code: null,
                                    video_game_id: null,
                                    release_date: null,
                                    release_price: null,
                                    store_page_url: null,
                                });
                                setData(
                                    await getAllValues(
                                        [
                                            Enum.titlePlatform,
                                            Enum.titleVideoGame,
                                        ],
                                        token
                                    )
                                );
                                openModal(Enum.titlePublication);
                            },
                        },
                        {
                            label: `read all ${Enum.titlePublication}`,
                            key: `readAll${Enum.titlePublication}`,
                            onClick: async () => {
                                setPage(1);
                                setCount(
                                    await getValues(
                                        `${Enum.titlePublication}/count`,
                                        token
                                    )
                                );
                                setTitle(`${search} ${Enum.titlePublication}`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        Enum.titlePublication,
                                        handleErrors,
                                        Enum.keyPublication,
                                        { page: 1, limit },
                                        Enum.UpdateValuesPublication
                                    )
                                );
                                setTitlePagination(Enum.titlePublication);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.titleGame,
            key: Enum.titleGame,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `create a ${Enum.titleGame}`,
                            key: `create${Enum.titleGame}`,
                            onClick: async () => {
                                setRef({
                                    user_id: null,
                                    publication_id: null,
                                    is_owned: null,
                                    review_date: null,
                                    review_comment: null,
                                    review_rating: null,
                                });
                                const { platform, videoGame, user } =
                                    await getAllValues(
                                        [
                                            Enum.titlePlatform,
                                            Enum.titleVideoGame,
                                            Enum.titleUser,
                                        ],
                                        token
                                    );

                                const publication =
                                    await modelingVideoGamesPerPlatform(
                                        token,
                                        platform,
                                        videoGame
                                    );
                                setData({
                                    publication,
                                    user,
                                });
                                openModal(Enum.titleGame);
                            },
                        },
                        {
                            label: `read all ${Enum.titleGame}`,
                            key: `readAll${Enum.titleGame}`,
                            onClick: async () => {
                                setPage(1);
                                setCount(
                                    await getValues(
                                        `${Enum.titleGame}/count`,
                                        token
                                    )
                                );
                                setTitle(`${search} ${Enum.titleGame}`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        Enum.titleGame,
                                        handleErrors,
                                        Enum.keyGame,
                                        { page: 1, limit },
                                        Enum.UpdateValuesGame
                                    )
                                );
                                setTitlePagination(Enum.titleGame);
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
            label: Enum.titlePlatform,
            key: Enum.titlePlatform,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.titlePlatform}`,
                            key: `create${Enum.titlePlatform}`,
                            onClick: () => {
                                setRef({
                                    code: null,
                                    description: null,
                                    abbreviation: null,
                                });
                                openModal(Enum.titlePlatform);
                            },
                        },
                        {
                            label: `read all ${Enum.titlePlatform}`,
                            key: `readAll${Enum.titlePlatform}`,
                            onClick: async () => {
                                setPage(1);
                                setCount(
                                    await getValues(
                                        `${Enum.titlePlatform}/count`,
                                        token
                                    )
                                );
                                setTitle(`${search} ${Enum.titlePlatform}`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        Enum.titlePlatform,
                                        handleErrors,
                                        Enum.keyPlatform,
                                        { page: 1, limit }
                                    )
                                );
                                setTitlePagination(Enum.titlePlatform);
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
            label: Enum.titleUser,
            key: Enum.titleUser,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.titleUser}`,
                            key: `create${Enum.titleUser}`,
                            onClick: () => {
                                setRef({
                                    username: null,
                                    email: null,
                                    password: null,
                                    firstname: null,
                                    lastname: null,
                                });
                                openModal(Enum.titleUser);
                            },
                        },
                        {
                            label: `read all ${Enum.titleUser}`,
                            key: `readAll${Enum.titleUser}`,
                            onClick: async () => {
                                setPage(1);
                                setCount(
                                    await getValues(
                                        `${Enum.titleUser}/count`,
                                        token
                                    )
                                );
                                setTitle(`${search} ${Enum.titleUser}`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        Enum.titleUser,
                                        handleErrors,
                                        Enum.keyUser,
                                        { page: 1, limit },
                                        Enum.UpdateValuesUser
                                    )
                                );
                                setTitlePagination(Enum.titleUser);
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
            label: Enum.titleCategory,
            key: Enum.titleCategory,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.titleCategory}`,
                            key: `create${Enum.titleCategory}`,
                            onClick: async () => {
                                setRef({
                                    genre_id: null,
                                    video_game_id: null,
                                });
                                setData(
                                    await getAllValues(
                                        [Enum.titleGenre, Enum.titleVideoGame],
                                        token
                                    )
                                );
                                openModal(Enum.titleCategory);
                            },
                        },
                        {
                            label: `read all ${Enum.titleCategory}`,
                            key: `readAll${Enum.titleCategory}`,
                            onClick: async () => {
                                setPage(1);
                                setCount(
                                    await getValues(
                                        `${Enum.titleCategory}/count`,
                                        token
                                    )
                                );
                                setTitle(`${search} ${Enum.titleCategory}`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        Enum.titleCategory,
                                        handleErrors,
                                        Enum.keyCategory,
                                        { page: 1, limit }
                                    )
                                );
                                setTitlePagination(Enum.titleCategory);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.titleVideoGame,
            key: Enum.titleVideoGame,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.titleVideoGame}`,
                            key: `create${Enum.titleVideoGame}`,
                            onClick: () => {
                                setRef({
                                    name: null,
                                    description: null,
                                });
                                openModal(Enum.titleVideoGame);
                            },
                        },
                        {
                            label: `read all ${Enum.titleVideoGame}`,
                            key: `readAll${Enum.titleVideoGame}`,
                            onClick: async () => {
                                setPage(1);
                                setCount(
                                    await getValues(
                                        `${Enum.titleVideoGame}/count`,
                                        token
                                    )
                                );
                                setTitle(`${search} ${Enum.titleVideoGame}`);
                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        Enum.titleVideoGame,
                                        handleErrors,
                                        Enum.keyVideoGame,
                                        { page: 1, limit }
                                    )
                                );
                                setTitlePagination(Enum.titleVideoGame);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.titleGenre,
            key: Enum.titleGenre,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.titleGenre}`,
                            key: `create${Enum.titleGenre}`,
                            onClick: () => {
                                setRef({
                                    name: null,
                                    description: null,
                                });
                                openModal(Enum.titleGenre);
                            },
                        },
                        {
                            label: `Read all ${Enum.titleGenre}`,
                            key: `readAll${Enum.titleGenre}`,
                            onClick: async () => {
                                setPage(1);
                                setTitle(`${search} ${Enum.titleGenre}`);

                                setCount(
                                    await getValues(
                                        `${Enum.titleGenre}/count`,
                                        token
                                    )
                                );

                                setValues(
                                    await getValuesToDisplay(
                                        token,
                                        Enum.titleGenre,
                                        handleErrors,
                                        Enum.keyGenre,
                                        { page: 1, limit }
                                    )
                                );
                                setTitlePagination(Enum.titleGenre);
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
