import { useState } from "react";
import { Button, ToggleButton } from "@mui/material";


const Tag = (props) => {
    const [isSelected, setSelected] = useState(false);

    return (
        // <Button variant='contained' disabled={isSelected} onClick={() => setSelected(!isSelected)}>
        //     {props.type}
        // </Button>
        <ToggleButton
            color="primary"
            selected={isSelected}
            onChange={() => setSelected(!isSelected)}
        >
            {props.type}
        </ToggleButton>
    );
}

export default Tag;