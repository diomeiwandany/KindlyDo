import { useEffect, useState } from "react"
import api from "../../helpers/api";
import TaskList from "../components/TaskList";
import Swal from "sweetalert2";

export default function MyTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                });
                // console.log(response);
                setTasks(response.data);
            } catch (error) {
                console.log(error);
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

    return (
        <TaskList tasks={tasks} />
    )
}