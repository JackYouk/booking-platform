import { useState } from "react";
import { Button, ToggleButton } from "@mui/material";


const Tag = (props) => {
    const [isSelected, setSelected] = useState(false);

    const handleChange = () => {
        const tagId = props.id
        if(!isSelected){

            props.selectedIds.push(tagId);
        }
        if(isSelected){
            const idIndex = props.selectedIds.map((selectedId, index) => {
                if(selectedId === tagId){
                    return index;
                }
            });
            props.selectedIds.splice(idIndex, 1);
        }
        setSelected(!isSelected);
    }

    return (
        // <Button variant='contained' disabled={isSelected} onClick={() => setSelected(!isSelected)}>
        //     {props.type}
        // </Button>
        <ToggleButton
            color="primary"
            selected={isSelected}
            onChange={handleChange}
            value={props.id}
        >
            {props.type}
        </ToggleButton>
    );
}

export default Tag;