import { Menu } from "antd";
import React, { useState } from "react";
import { DownCircleOutlined } from "@ant-design/icons";
import "../css/AdminView.css";
import getValues from "../APIAccess/APIAccess";

const search = "TYPE OF THE SEARCH : READ ALL";
/**
 * creating the navigation bar for the admin view
 * 
 * @param {function} setValues - function to set the values of the table
 * @param {object} token - token to access the API
 * 
 * @returns {JSX.Element} - the navigation bar
 */
function navigationBar(setValues,token) {
    const [current, setCurrent] = useState("user");
    const [title, setTitle] = useState("VALEUR PAR DEFAUT");
    const handleClick = (e) => {
        setCurrent(e.key);
    };
    //classname for every menu item
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
                            onClick: () => {
                                setTitle("CREATE A PUBLICATION");
                            }
                        },
                        {
                            label: "read all publication",
                            key: "readAllPublication",
                            onClick: async () => {
                                setTitle(`${search} PUBLICATIONS`);
                                const result = await getValues(token,"http://localhost:3001/publication");
                                result.forEach((element) => {
                                    element.release_date = new Date(element.release_date).toLocaleDateString();
                                    element.store_page_url = <a href={element.store_page_url}>{element.store_page_url}</a>
                                });
                                //made the url clickable
                                //y apporter une key pour chaque ligne
                                setValues(result);
                            }
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
                            onClick: () => {
                                setTitle("CREATE A GAME");
                            }
                        },
                        {
                            label: "read all games",
                            key: "readAllGame",
                            onClick: async () => {
                                setTitle(`${search} GAMES`);
                                const result = await getValues(token,"http://localhost:3001/game");
                                //! gérer les erreurs
                                result.forEach((element) => {
                                    element.review_date = new Date(element.review_date).toLocaleDateString();
                                    element.is_owned = element.is_owned.toString();
                                });
                                // set le boolean en string + review_date en bon format
                                //y apporter une key pour chaque ligne
                                setValues(result);
                            }
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
                            }
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
                            }
                        },
                        {
                            label: "read all platforms",
                            key: "readAllPlatform",
                            onClick: async () => {
                                setTitle(`${search} PLATFORMS`);
                                const result = await getValues(token,"http://localhost:3001/platform");
                                //y apporter une key pour chaque ligne
                                setValues(result);
                            }
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
                            }
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
                            }
                        },
                        {
                            label: "read all users",
                            key: "readAllUser",
                            onClick: async () => {
                                setTitle(`${search} USERS`);
                                const result = await getValues(token,"http://localhost:3001/user");
                                //y apporter une key pour chaque ligne
                                // set le boolean en string
                                result.forEach((element) => {
                                    element.is_admin = element.is_admin.toString();
                                });
                                setValues(result);
                            }
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
                            }
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
                            onClick: () => {
                                setTitle("CREATE A CATEGORY");
                            },
                        },
                        {
                            label: "read all categories",
                            key: "readAllCategory",
                            onClick: async () => {
                                setTitle(`${search} CATEGORIES`);
                                const result = await getValues(token,"http://localhost:3001/category");
                                //y apporter une key pour chaque ligne
                                setValues(result);
                            }
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
                            },
                        },
                        {
                            label: "read all video games",
                            key: "readAllVideoGame",
                            onClick: async () => {
                                setTitle(`${search} VIDEO GAMES`);
                                const result = await getValues(token,"http://localhost:3001/videoGame");
                                //y apporter une key pour chaque ligne
                                setValues(result);
                            }
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
                            },
                        },
                        {
                            label: "read all genres",
                            key: "readAllGenre",
                            onClick: async () => {
                                setTitle(`${search} GENRES`);   
                                const result = await getValues(token,"http://localhost:3001/type");
                                //y apporter une key pour chaque ligne
                                setValues(result);
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
                selectedKeys={current}
                mode="horizontal"
                items={adminPossibilities}
            />
            <h2 id="titleView">{title}</h2>
        </div>
    );
}

export default navigationBar;
