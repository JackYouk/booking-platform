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
                <div onClick={() => {
                    handleChange();
                    setSelected(!isSelected);
                }}>
                    <div className='goldBg' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {props.iconUrl ? (
                            <>
                                <img
                                    src={props.iconUrl}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                    alt='tag img'
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {props.type}
                    </div>
                </div>
            ) : (
                <div className='obsBg' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', borderRadius: '5px', fontWeight: 'bold', color: 'black', cursor: 'pointer' }} onClick={() => {
                    handleChange();
                    setSelected(!isSelected);
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {props.iconUrl ? (
                            <>
                                <img
                                    src={props.iconUrl}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                    alt='tag img'
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {props.type}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tag;