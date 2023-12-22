import { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import { InputWithLabel } from "../components/form/form";
import { useNavigate } from "react-router-dom";
import { login } from "../APIAccess/APIAccess";
import { useDispatch } from "react-redux";
import { notification } from "antd";

/**
 * The home page
 *
 * @returns {JSX.Element} The home page
 */
function Home() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [notifier, notificationHolder] = notification.useNotification();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Opens a notification error
     *
     * @returns {void}
     */
    const openNotificationError = () => {
        notifier.error({
            message: "Login failed !",
            placement: "top",
            duration: 3,
        });
    };

    /**
     * Handles the sign in
     *
     * @throws {Error} if the request failed
     *
     * @returns {void}
     */
    const signIn = () => {
        login(
            "user/login",
            {
                login: usernameRef.current.value,
                password: passwordRef.current.value,
            },
            dispatch
        )
            .then((isAdmin) => {
                if (isAdmin) {
                    navigate("/admin");
                } else {
                    openNotificationError();
                }
            })
            .catch(() => {
                openNotificationError();
            });
    };

    return (
        <div>
            {notificationHolder}
            <img src="./src/Images/logo.png" alt="ratyagames" id="img" />
            <div className="container">
                <InputWithLabel
                    label="Username"
                    input={{ type: "text", id: "username", ref: usernameRef }}
                    className={{ label: "label", input: "input" }}
                    placeholder="Username"
                />
                <InputWithLabel
                    label="Password "
                    input={{
                        type: "password",
                        id: "password",
                        ref: passwordRef,
                    }}
                    className={{ label: "label", input: "input" }}
                    placeholder="Password"
                />
            </div>
            <button id="button" onClick={signIn}>
                Sign in
            </button>
        </div>
    );
}

export default Home;
