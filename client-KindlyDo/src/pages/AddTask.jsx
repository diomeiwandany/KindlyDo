import { useEffect, useState } from "react";
import KindlyIcon from "../components/KindlyIcon";
import { Link, useNavigate } from "react-router-dom";
import api from "../../helpers/api";
import Swal from "sweetalert2";

export default function AddTask() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [assigneeId, setAssigneeId] = useState("");
    const [users, setUsers] = useState([]);

    // console.log({ name, description, assigneeId });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                });
                // console.log(response.data);
                setUsers(response.data);
            } catch (error) {
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



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = JSON.parse(atob(localStorage.access_token.split('.')[1]));
            const { id } = payload;
            // console.log(payload);
            const response = await api.post("/task", {
                name,
                description,
                assignerId: id,
                assigneeId,
                status: "On progress",
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                }
            });
            // console.log(response);
            navigate('/');
        } catch (error) {
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
            };
        }
    };

    return (
        <section className="vh-100 gradient-custom-2">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-12 col-xl-10">
                        <div className="card mask-custom mt-5">
                            <div className="card-body p-4 text-black">
                                <div className="text-center pt-3 pb-2">
                                    <KindlyIcon />
                                    <h2 className="my-4">Add Task</h2>
                                </div>
                                <div className="text-center pt-3 pb-2">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="taskName" className="form-label">
                                                Task Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="taskName"
                                                placeholder="Enter Task Name"
                                                required=""
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="taskDescription" className="form-label">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="taskDescription"
                                                placeholder="Enter Task Description"
                                                required=""
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="taskAssignee" className="form-label">
                                                Assign To
                                            </label>


                                            <select id="taskAssignee" className="form-select" required="" onChange={(e) => setAssigneeId(e.target.value)}>
                                                {users.map((user) => {
                                                    return (
                                                        <option onChange={(e) => setAssigneeId(e.target.value)} key={user.id} value={user.id}>{user.name} - {user.email} - {user.id}</option>
                                                    )
                                                })}
                                            </select>


                                        </div>

                                        <div className="row gap-3 p-2 g-col-6">
                                            <Link to={-1} className="col btn btn-danger">Cancel</Link>
                                            <button type="submit" className="col btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}