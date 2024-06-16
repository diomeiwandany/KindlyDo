import { Link, useNavigate } from "react-router-dom";

export default function Panel() {
    const navigate = useNavigate();
    return (
        <>
            <div className="row grid gap-3 p-2 g-col-6">
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
        </>
    )
};