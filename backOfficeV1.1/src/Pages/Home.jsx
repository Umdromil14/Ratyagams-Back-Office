import { useRef } from "react";
import "../css/Home.css";
import InputWithLabel from "../components/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slice/token";
import { useState } from "react";
import axios from "axios";
import getValues from "../APIAccess/APIAccess";
import { notification } from "antd";

function Home() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(false);
    const [api,contextHolder] = notification.useNotification();
    const [messageError, setMessageError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openNotificationError = () => {
        api['error']({
            message: "Something went wrong...",
            description: messageError,
            placement: "bottomRight",
        });
    };

    const signIn = async () => {
        setError(false);
        try {
            const result = await axios.post(
                "http://localhost:3001/user/login",
                {
                    login: usernameRef.current.value,
                    password: passwordRef.current.value,
                }
            );
            //check if the user is admin
            if (result.data.token) {
                dispatch(setToken({ payload: result.data.token }));
                const user = await getValues(
                    {
                        headers: {
                            Authorization: `Bearer ${result.data.token}`,
                        },
                    },
                    "http://localhost:3001/user/me"
                );
                if (user.is_admin) {
                    navigate("/admin");
                } else {

                }
            }
        } catch (error) {
            setError(true);
            switch (error.response.status) {
                case 401:
                    setMessageError("Wrong password");
                    openNotificationError();
                    break;
                case 404:
                    setMessageError("Wrong username");
                    openNotificationError();
                    break;
                default:
                    setMessageError("Error");
                    openNotificationError();
            }
        }
    };

    return (
        <div>
            {contextHolder}
            <img src="./src/Images/ratyagames.png" alt="ratyagames" id="img" />
            <div className="container">
                {InputWithLabel(
                    { htmlFor: "username", label: "Username" },
                    { type: "text", id: "username", ref: usernameRef }
                )}
                {InputWithLabel(
                    { htmlFor: "password", label: "Password " },
                    { type: "password", id: "password", ref: passwordRef }
                )}
            </div>
            <button id="button" onClick={signIn}>
                Sign in
            </button>
        </div>
    );
}

export default Home;
