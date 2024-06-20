import { useEffect, useState } from "react";
import KindlyIcon from "../components/KindlyIcon";
import { Link, useNavigate } from "react-router-dom";
import api from "../../helpers/api";
import Swal from "sweetalert2";

export default function AITask() {
    const [tasks, setTasks] = useState([]);
    const [command, setCommand] = useState("");
    const [result, setResult] = useState("");

    // console.log({ command });

    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await api.get('/', {
                const response = await api.get('/task/all', {
                    // /task/all
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                });
                // console.log(response.data);
                setTasks(response.data);
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
            const response = await api.post('/task/ai', {
                taskList: tasks,
                command: command
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                }
            });
            // console.log(response);
            setResult(response.data);
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
                                    <h2 className="my-4">OpenAI Support</h2>
                                </div>
                                <div className="text-center pt-3 pb-2">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="taskName" className="form-label">
                                                Input Command
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="taskName"
                                                placeholder="Enter your command"
                                                required=""
                                                value={command}
                                                onChange={(e) => setCommand(e.target.value)}
                                            />
                                        </div>

                                        <div className="row gap-3 p-2 g-col-6">
                                            <Link to={-1} className="col btn btn-danger">Cancel</Link>
                                            <button type="submit" className="col btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                    <div className="text-center pt-3 pb-2">
                                        <div>
                                            Comand: <br></br> {command}
                                        </div>
                                        <br></br>
                                        <div>
                                            Result: <br></br> {result}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}