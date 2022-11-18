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
            color="secondary"
            selected={isSelected}
            onChange={handleChange}
            value={props.id}
            alignItems='center'
            justifyContent='center'
        >
            
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {props.iconUrl ? (
                    <>
                        <img 
                            src={props.iconUrl} 
                            style={{width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px'}} 
                            alt='tag img' 
                        />
                    </>
                ) : (
                    <>
                    </>
                )}
                {props.type}
            </div>
            
        </ToggleButton>
    );
}

export default Tag;