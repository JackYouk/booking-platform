import { useState } from "react";
import { Button, ToggleButton } from "@mui/material";


const Tag = (props) => {
    const [isSelected, setSelected] = useState(false);

    const handleChange = () => {
        const tagId = props.id
        if (!isSelected) {

            props.selectedIds.push(tagId);
        }
        if (isSelected) {
            props.selectedIds.map((selectedId, index) => {
                if (selectedId === tagId) {
                    props.selectedIds.splice(index, 1);
                    return;
                }
            });

        }
        setSelected(!isSelected);
    }

    return (
        <div>
            {isSelected ? (
                <Button color='secondary' variant='contained'  onClick={() => {
                    handleChange();
                    setSelected(!isSelected);
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {props.iconUrl ? (
                            <>
                                <img
                                    src={props.iconUrl}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                    alt='tag img'
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {props.type}
                    </div>
                </Button>
            ) : (
                <Button color='secondary' variant='outlined' style={{backgroundColor: 'black'}} onClick={() => {
                    handleChange();
                    setSelected(!isSelected);
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {props.iconUrl ? (
                            <>
                                <img
                                    src={props.iconUrl}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                                    alt='tag img'
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {props.type}
                    </div>
                </Button>
            )}
        </div>
    );
}

export default Tag;