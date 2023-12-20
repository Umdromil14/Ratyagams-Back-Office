import { Menu } from "antd";
import React, { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import "../css/AdminView.css";
import * as Enum from "../constants/enum";

const search = "Search type : ";

/**
 * Creates the navigation bar for the admin view
 *
 * @param {Object} props the props
 * @param {function} props.setTitle set the title of the pagination
 * @param {function} props.handleModal handle the modal
 *
 * @returns {JSX.Element} The navigation bar
 */
function NavigationBar({ setTitle, handleModal }) {
    const [current, setCurrent] = useState();
    const [pageTitle, setPageTitle] = useState("WELCOME TO THE ADMIN VIEW");

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const adminPossibilities = [
        {
            label: Enum.TITLE_PUBLICATION,
            key: Enum.TITLE_PUBLICATION,
            icon: <DownCircleOutlined />,
            children: [
                {
                    label: "Create & Read",
                    type: "group",
                    children: [
                        {
                            label: `create a ${Enum.TITLE_PUBLICATION}`,
                            key: `create${Enum.TITLE_PUBLICATION}`,
                            onClick: () => {
                                handleModal(Enum.TITLE_PUBLICATION);
                            },
                        },
                        {
                            label: `read all ${Enum.TITLE_PUBLICATION}`,
                            key: `readAll${Enum.TITLE_PUBLICATION}`,
                            onClick: () => {
                                setPageTitle(
                                    `${search} ${Enum.TITLE_PUBLICATION}`
                                );
                                setTitle(Enum.TITLE_PUBLICATION);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.TITLE_GAME,
            key: Enum.TITLE_GAME,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `create a ${Enum.TITLE_GAME}`,
                            key: `create${Enum.TITLE_GAME}`,
                            onClick: () => {
                                handleModal(Enum.TITLE_GAME);
                            },
                        },
                        {
                            label: `read all ${Enum.TITLE_GAME}`,
                            key: `readAll${Enum.TITLE_GAME}`,
                            onClick: () => {
                                setPageTitle(`${search} ${Enum.TITLE_GAME}`);
                                setTitle(Enum.TITLE_GAME);
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
                                handleModal(Enum.TITLE_USER_WITH_GAME);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.TITLE_PLATFORM,
            key: Enum.TITLE_PLATFORM,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.TITLE_PLATFORM}`,
                            key: `create${Enum.TITLE_PLATFORM}`,
                            onClick: () => {
                                handleModal(Enum.TITLE_PLATFORM);
                            },
                        },
                        {
                            label: `read all ${Enum.TITLE_PLATFORM}`,
                            key: `readAll${Enum.TITLE_PLATFORM}`,
                            onClick: () => {
                                setPageTitle(`${search} ${Enum.TITLE_PLATFORM}`);
                                setTitle(Enum.TITLE_PLATFORM);
                            },
                        },
                    ],
                },
                {
                    type: "group",
                    label: "Transaction",
                    children: [
                        {
                            label: "insert a platform with some video games",
                            key: "insertPlatformWithVideoGame",
                            onClick: () => {
                                handleModal(Enum.TITLE_PLATFORM_WITH_VIDEO_GAMES);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.TITLE_USER,
            key: Enum.TITLE_USER,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.TITLE_USER}`,
                            key: `create${Enum.TITLE_USER}`,
                            onClick: () => {
                                handleModal(Enum.TITLE_USER);
                            },
                        },
                        {
                            label: `read all ${Enum.TITLE_USER}`,
                            key: `readAll${Enum.TITLE_USER}`,
                            onClick: () => {
                                setPageTitle(`${search} ${Enum.TITLE_USER}`);
                                setTitle(Enum.TITLE_USER);
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
                                handleModal(Enum.TITLE_USER_WITH_GAME);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.TITLE_CATEGORY,
            key: Enum.TITLE_CATEGORY,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.TITLE_CATEGORY}`,
                            key: `create${Enum.TITLE_CATEGORY}`,
                            onClick: async () => {
                                handleModal(Enum.TITLE_CATEGORY);
                            },
                        },
                        {
                            label: `read all ${Enum.TITLE_CATEGORY}`,
                            key: `readAll${Enum.TITLE_CATEGORY}`,
                            onClick: () => {
                                setPageTitle(`${search} ${Enum.TITLE_CATEGORY}`);
                                setTitle(Enum.TITLE_CATEGORY);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.TITLE_VIDEO_GAME,
            key: Enum.TITLE_VIDEO_GAME,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.TITLE_VIDEO_GAME}`,
                            key: `create${Enum.TITLE_VIDEO_GAME}`,
                            onClick: () => {
                                handleModal(Enum.TITLE_VIDEO_GAME);
                            },
                        },
                        {
                            label: `read all ${Enum.TITLE_VIDEO_GAME}`,
                            key: `readAll${Enum.TITLE_VIDEO_GAME}`,
                            onClick: () => {
                                setPageTitle(
                                    `${search} ${Enum.TITLE_VIDEO_GAME}`
                                );
                                setTitle(Enum.TITLE_VIDEO_GAME);
                            },
                        },
                    ],
                },
            ],
        },
        {
            label: Enum.TITLE_GENRE,
            key: Enum.TITLE_GENRE,
            icon: <DownCircleOutlined />,
            children: [
                {
                    type: "group",
                    label: "Create & Read",
                    children: [
                        {
                            label: `Create a ${Enum.TITLE_GENRE}`,
                            key: `create${Enum.TITLE_GENRE}`,
                            onClick: () => {
                                handleModal(Enum.TITLE_GENRE);
                            },
                        },
                        {
                            label: `Read all ${Enum.TITLE_GENRE}`,
                            key: `readAll${Enum.TITLE_GENRE}`,
                            onClick: () => {
                                setPageTitle(`${search} ${Enum.TITLE_GENRE}`);
                                setTitle(Enum.TITLE_GENRE);
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
                items={adminPossibilities}
                selectedKeys={[current]}
            />
            <h2 id="titleView">{pageTitle}</h2>
        </div>
    );
}

export default NavigationBar;
