import { Menu } from "antd";
import React, { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import "../css/AdminView.css";
import { getValuesToDisplay, getValues } from "../APIAccess/APIAccess";
import * as Enum from "../constants/enum";
import { modelingPublication } from "../tools/modelingData";
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
    setForm,
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
                                setForm({
                                    platform_code: null,
                                    video_game_id: null,
                                    release_date: null,
                                    release_price: null,
                                    store_page_url: null,
                                });
                                try {
                                    setData(
                                        await getAllValues(
                                            [
                                                Enum.titlePlatform,
                                                Enum.titleVideoGame,
                                            ],
                                            token
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }
                                openModal(Enum.titlePublication);
                            },
                        },
                        {
                            label: `read all ${Enum.titlePublication}`,
                            key: `readAll${Enum.titlePublication}`,
                            onClick: async () => {
                                try {
                                    setCount(
                                        await getValues(
                                            `${Enum.titlePublication}/count`,
                                            token
                                        )
                                    );
                                    setValues(
                                        await getValuesToDisplay(
                                            token,
                                            Enum.titlePublication,
                                            Enum.keyPublication,
                                            { page: 1, limit },
                                            Enum.UpdateValuesPublication
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }

                                setPage(1);
                                setTitle(`${search} ${Enum.titlePublication}`);
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
                                let data, publication;
                                setForm({
                                    user_id: null,
                                    publication_id: null,
                                    is_owned: null,
                                    review_date: null,
                                    review_comment: null,
                                    review_rating: null,
                                });
                                try {
                                    data = await getAllValues(
                                        [Enum.titleUser, Enum.titlePlatform],
                                        token
                                    );
                                    publication = await getValues(
                                        Enum.titlePublication,
                                        token,
                                        { getVideoGamesInfo: true }
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }

                                const publicationDisplay = modelingPublication(
                                    publication,
                                    data.platform
                                );
                                setData({
                                    publication: publicationDisplay,
                                    user: data.user,
                                });
                                openModal(Enum.titleGame);
                            },
                        },
                        {
                            label: `read all ${Enum.titleGame}`,
                            key: `readAll${Enum.titleGame}`,
                            onClick: async () => {
                                try {
                                    setCount(
                                        await getValues(
                                            `${Enum.titleGame}/count`,
                                            token
                                        )
                                    );
                                    setValues(
                                        await getValuesToDisplay(
                                            token,
                                            Enum.titleGame,
                                            Enum.keyGame,
                                            { page: 1, limit },
                                            Enum.UpdateValuesGame
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }
                                setPage(1);
                                setTitle(`${search} ${Enum.titleGame}`);
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
                                setForm({
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
                                try {
                                    setCount(
                                        await getValues(
                                            `${Enum.titlePlatform}/count`,
                                            token
                                        )
                                    );
                                    setValues(
                                        await getValuesToDisplay(
                                            token,
                                            Enum.titlePlatform,
                                            Enum.keyPlatform,
                                            { page: 1, limit }
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }
                                setPage(1);
                                setTitle(`${search} ${Enum.titlePlatform}`);
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
                                setForm({
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
                                try {
                                    setCount(
                                        await getValues(
                                            `${Enum.titleUser}/count`,
                                            token
                                        )
                                    );
                                    setValues(
                                        await getValuesToDisplay(
                                            token,
                                            Enum.titleUser,
                                            Enum.keyUser,
                                            { page: 1, limit },
                                            Enum.UpdateValuesUser
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }
                                setPage(1);
                                setTitle(`${search} ${Enum.titleUser}`);
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
                                setForm({
                                    genre_id: null,
                                    video_game_id: null,
                                });
                                try {
                                    setData(
                                        await getAllValues(
                                            [
                                                Enum.titleGenre,
                                                Enum.titleVideoGame,
                                            ],
                                            token
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }
                                openModal(Enum.titleCategory);
                            },
                        },
                        {
                            label: `read all ${Enum.titleCategory}`,
                            key: `readAll${Enum.titleCategory}`,
                            onClick: async () => {
                                try {
                                    setCount(
                                        await getValues(
                                            `${Enum.titleCategory}/count`,
                                            token
                                        )
                                    );
                                    setValues(
                                        await getValuesToDisplay(
                                            token,
                                            Enum.titleCategory,
                                            Enum.keyCategory,
                                            { page: 1, limit }
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return ;
                                }
                                setPage(1);
                                setTitle(`${search} ${Enum.titleCategory}`);
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
                                setForm({
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
                                try {
                                    setCount(
                                        await getValues(
                                            `${Enum.titleVideoGame}/count`,
                                            token
                                        )
                                    );
                                    setValues(
                                        await getValuesToDisplay(
                                            token,
                                            Enum.titleVideoGame,
                                            Enum.keyVideoGame,
                                            { page: 1, limit }
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }
                                setPage(1);
                                setTitle(`${search} ${Enum.titleVideoGame}`);
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
                                setForm({
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
                                try {
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
                                            Enum.keyGenre,
                                            { page: 1, limit }
                                        )
                                    );
                                } catch (error) {
                                    handleErrors(
                                        error.response.data.message.split(";")
                                    );
                                    return;
                                }
                                setPage(1);
                                setTitle(`${search} ${Enum.titleGenre}`);
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
