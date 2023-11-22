import { useRef } from "react";
import "../css/Home.css";
import InputWithLabel from "../components/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slice/token";
import axios from "axios";

function Home() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signIn = async () => {
        //set a state loading on the button to true
        try {
            const result = await axios.post(
                "http://localhost:3001/user/login",
                {
                    login: usernameRef.current.value,
                    password: passwordRef.current.value,
                }
            );
            
            if (result.data.token) {
                dispatch(setToken({ payload: result.data.token }));
                navigate("/admin");
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    return (
        <div>
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
