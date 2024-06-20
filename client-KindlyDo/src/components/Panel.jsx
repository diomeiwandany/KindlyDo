import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../helpers/api";
import Swal from "sweetalert2";

export default function Panel() {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const payload = JSON.parse(atob(localStorage.access_token.split('.')[1]));
                const { id } = payload;
                // console.log(id);
                // console.log(payload.iat);
                const response = await api.get(`/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                });
                // console.log(response.data);
                setUser(response.data);
            } catch (error) {
                // console.log(error);
                if (error.response) {
                    Swal.fire({
                        title: "Error!",
                        text: error.response.data.message,
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong",
                        icon: "error"
                    });
                }
            }
        }
        fetchData();
    }, []);


    const navigate = useNavigate();
    return (
        <>
            <div className="row grid gap-3 p-2 g-col-6">
                {/* <div>Welcome {user.name}</div> */}
                <Link className="col btn btn-primary" to={'/task/my'}>Mine</Link>
                <Link className="col btn btn-warning" to={'/task/other'}>Not Mine</Link>
                <Link className="col btn btn-primary" to={'/task/all'}>All Task</Link>
                <button className="col btn btn-danger" onClick={() => {
                    localStorage.removeItem("access_token")
                    navigate('/login')
                }}>Logout</button>
            </div>
            <div className="row grid gap-3 p-2 g-col-6">
                <Link className="col btn btn-success" to={'/task/add'}>Add Task</Link>
            </div>
            {!user.proUser ?
                <div className="row grid gap-3 p-2 g-col-6">
                    <Link className="col btn btn-dark" to={`/pro/${user.id}`}>Need AI Assistant? Become PRO USER! ✊🏻</Link>
                </div>
                :
                <div className="row grid gap-3 p-2 g-col-6">
                    <Link className="col btn btn-info" to={'/task/ai'}>Click me for AI Assistant 😎</Link>
                </div>
            }
        </>
    )
};