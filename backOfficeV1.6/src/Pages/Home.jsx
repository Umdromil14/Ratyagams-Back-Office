import { useEffect, useRef, useState } from "react";
import "../css/Home.css";
import InputWithLabel from "../components/form/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { login } from "../APIAccess/APIAccess";
import { useDispatch } from "react-redux";
import { notification } from "antd";

function Home() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [messageError, setMessageError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            openNotificationError();
            setTimeout(() => {
                setError(false);
            }, 2000);
        }
    }, [error]);

    function handleErrors(response) {
        setError(true);
        setMessageError(response);
    }

    const openNotificationError = () => {
        api.error({
            message: "Something went wrong...",
            description: messageError,
            placement: "top",
            duration: 2,
        });
    };

    const signIn = async () => {
        try {
            const is_admin = await login(
                "user/login",
                {
                    login: usernameRef.current.value,
                    password: passwordRef.current.value,
                },
                dispatch
            );
            if (is_admin) {
                navigate("/admin");
            } else {
                handleErrors("You can't access to this page");
            }
        } catch (error) {
            handleErrors(error.response.data.message);
        }
    };

    return (
        <div>
            {contextHolder}
            <img src="./src/Images/logo.png" alt="ratyagames" id="img" />
            <div className="container">
                {InputWithLabel(
                    { label: "Username" },
                    { type: "text", id: "username", ref: usernameRef },
                    { label: "label", input: "input" },
                    "Username"
                )}
                {InputWithLabel(
                    { label: "Password " },
                    { type: "password", id: "password", ref: passwordRef },
                    { label: "label", input: "input" },
                    "Password"
                )}
            </div>
            <button id="button" onClick={signIn}>
                Sign in
            </button>
        </div>
    );
}

export default Home;
