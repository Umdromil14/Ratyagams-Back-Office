import { Menu } from "antd";
import React, { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import "../css/AdminView.css";
import * as Enum from "../constants/enum";

const search = "Type of the search : ";
/**
 * creating the navigation bar for the admin view
 *
 * @param {function} setModalTitle set the title of the modal
 * @param {function} setTitlePagination set the title of the pagination
 * @param {function} handleModal handle the modal
 *
 * @returns {JSX.Element} - the navigation bar
 */
function NavigationBar({
    setModalTitle,
    setTitlePagination,
    handleModal
}) {
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
                            onClick: () => {
                                setModalTitle(Enum.titlePublication);
                                handleModal(Enum.titlePublication);
                            },
                        },
                        {
                            label: `read all ${Enum.titlePublication}`,
                            key: `readAll${Enum.titlePublication}`,
                            onClick: () => {
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
                            onClick: () => {
                                setModalTitle(Enum.titleGame);
                                handleModal(Enum.titleGame);
                            },
                        },
                        {
                            label: `read all ${Enum.titleGame}`,
                            key: `readAll${Enum.titleGame}`,
                            onClick: () => {
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
                                setModalTitle(Enum.titlePlatform);
                                handleModal(Enum.titlePlatform);
                            },
                        },
                        {
                            label: `read all ${Enum.titlePlatform}`,
                            key: `readAll${Enum.titlePlatform}`,
                            onClick: () => {
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
                                setModalTitle(Enum.titleUser);
                                handleModal(Enum.titleUser);
                            },
                        },
                        {
                            label: `read all ${Enum.titleUser}`,
                            key: `readAll${Enum.titleUser}`,
                            onClick: () => {
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
                                setModalTitle(Enum.titleCategory);
                                handleModal(Enum.titleCategory);
                            },
                        },
                        {
                            label: `read all ${Enum.titleCategory}`,
                            key: `readAll${Enum.titleCategory}`,
                            onClick: () => {
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
                                setModalTitle(Enum.titleVideoGame);
                                handleModal(Enum.titleVideoGame);
                            },
                        },
                        {
                            label: `read all ${Enum.titleVideoGame}`,
                            key: `readAll${Enum.titleVideoGame}`,
                            onClick: () => {
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
                                setModalTitle(Enum.titleGenre);
                                handleModal(Enum.titleGenre);
                            },
                        },
                        {
                            label: `Read all ${Enum.titleGenre}`,
                            key: `readAll${Enum.titleGenre}`,
                            onClick: () => {
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

export default NavigationBar;
