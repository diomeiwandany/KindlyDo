import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../helpers/api";
import { useState } from "react";

export default function Tasks(props) {
    const { task } = props;

    const handleDelete = async (id) => {
        try {
            const { id } = task;
            await api.delete(`/task/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`,
                }
            });
            window.location.reload(false);
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

    return (
        <tr>
            <td className="align-middle">
                {task.name}
            </td>
            <td className="align-middle">
                {task.description}
            </td>
            <td className="align-middle">
                {task.assigner.name}
            </td>
            <td className="align-middle">
                {task.assignee.name}
            </td>
            <td className="align-middle">
                {task.status}
            </td>
            <td className="align-middle">
                {task.createdAt.split("T")[0]}
            </td>
            <td className="align-middle">
                {task.updatedAt.split("T")[0]}
            </td>
            {window.location.pathname === "/task/my" ?
                <td className="row align-middle mt-4">
                    <Link to={`/task/${task.id}`} className="col btn btn-success">Update</Link>
                    <button onClick={handleDelete} className="col btn btn-danger">Delete</button>
                    {/* <DeleteButton task={task} /> */}
                </td> : null}
        </tr>
    )
};