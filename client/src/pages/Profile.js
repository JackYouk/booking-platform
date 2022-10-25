import { Button, Box, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Table, Typography, } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import Auth from './../utils/auth'
import {useQuery} from '@apollo/client';
import { QUERY_ME } from "../utils/queries";

const Profile = () => {
    const [formState, setFormState] = useState({});
    const handleTextChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const {loading, data} = useQuery(QUERY_ME);

    const handleEdit = () => {

    }

    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;