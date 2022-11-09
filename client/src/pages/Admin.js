import auth from "../utils/auth";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Admin = () => {
    const isAdmin = () => {
        if (!auth.loggedIn()) {
            return false;
        }
        const loggedInUser = auth.getProfile()
        if (loggedInUser.data.email === 'admin@za555.com') {
            return true;
        }
        return false;
    }

    return (
        <div>
            {isAdmin() ? (
                <div>
                    <h1>Admin Dashboard</h1>
                    <Link to='/createAgent'>
                        <Button>Create Agent</Button>
                    </Link>
                    <Link to='/createTag'>
                        <Button>Create Tag</Button>
                    </Link>
                    <Link to='/deleteAgent'>
                        <Button>Delete Agent</Button>
                    </Link>
                    <Link to='/deleteTag'>
                        <Button>Delete Tag</Button>
                    </Link>
                </div>

            ) : (
                <h3>Error: Admin not logged in</h3>
            )}
        </div>
    );
}

export default Admin;