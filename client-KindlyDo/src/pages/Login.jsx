import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        const access_token = "duarnmax";
        localStorage.setItem('token', access_token);
        navigate('/');
    };

    async function handleCredentialResponse(response) {
        try {
            const res = await axios({
                method: 'POST',
                url: import.meta.env.VITE_SERVER_URL + "/login",
                headers: {
                    google_token: response.credential,
                },
            });

            if (res) {
                localStorage.access_token = res.data.access_token;
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        };
    }

    useEffect(() => {
        window.onload = function () {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_CLIENTID,
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
    }, []);


    return (
        <>
            <section>
                <div className="row" style={{
                    // backgroundColor: 'red',
                    height: '100vh'
                }}>
                    <div className="col d-flex justify-content-center align-items-center" style={{
                        // backgroundColor: 'red',
                        height: '50vw',
                        width: '100vh',
                    }}>
                        <img src="/login.png" alt="google login" width={500} />
                    </div>
                    <div className="col d-flex justify-content-center align-items-center bg-body-secondary">
                        <button className="btn btn-primary" id="buttonDiv" type="button" onClick={handleLogin}></button>
                    </div>
                </div>
            </section>
        </>
    )
};