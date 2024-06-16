import { Link } from "react-router-dom";

export default function Tasks(props) {
    // console.log(props);
    const { task } = props;
    // console.log(task);
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
                <td className="align-middle">
                    <Link to={`/task/${task.id}`} className="btn btn-success">Update</Link>
                </td> : null}
        </tr>
    )
};