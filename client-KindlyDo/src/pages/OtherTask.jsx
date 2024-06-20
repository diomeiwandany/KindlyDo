import { useEffect, useState } from "react"
import api from "../../helpers/api";
import TaskList from "../components/TaskList";

export default function OtherTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/task/other', {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_token}`,
                    }
                });
                // console.log(response);
                setTasks(response.data);
            } catch (error) {

            }
        }
        fetchData();
    }, []);

    return (
        <TaskList tasks={tasks} />
    )
}