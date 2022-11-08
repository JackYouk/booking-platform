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
            props.selectedIds.map((selectedId, index) => {
                if(selectedId === tagId){
                    props.selectedIds.splice(index, 1);
                    return;
                }
            });
            
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