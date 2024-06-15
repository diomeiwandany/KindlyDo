export default function Tasks(props) {
    // console.log(props);
    const { task } = props;
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
        </tr>
    )
};