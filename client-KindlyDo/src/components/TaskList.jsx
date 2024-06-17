import Tasks from "./Tasks"
import Panel from "./Panel"
import KindlyIcon from "./KindlyIcon"

export default function TaskList(props) {
    const { tasks } = props;
    // console.log(props);

    return (
        <section className="vh-100 gradient-custom-2">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-12 col-xl-10">
                        <Panel />
                        <div className="card mask-custom mt-5">
                            <div className="card-body p-4 text-black">
                                <div className="text-center pt-3 pb-2">
                                    <KindlyIcon />
                                    <h2 className="my-4">Task List</h2>
                                </div>
                                <table className="table text-white mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Task Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Assigned by</th>
                                            <th scope="col">Assigned to</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Updated At</th>
                                            {window.location.pathname === "/task/my" ? <th scope="col">Action</th> : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task) => {
                                            return (
                                                <Tasks task={task} key={task.id} />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}