import { useState } from "react";
import { Button, ToggleButton } from "@mui/material";


const Tag = (selectedTagsState, setSelectedTagsState, iconUrl, type, id) => {

    const [isSelected, setSelected] = useState(false);

    const handleChange = () => {
        const tagId = id;
        if (!isSelected) {
            setSelected(!isSelected);
            setSelectedTagsState(selectedTagsState.map().push(tagId));
            return;
        }
        if (isSelected) {
            selectedTagsState.map((selectedTag, index) => {
                if (selectedTag === tagId) {
                    ;
                    setSelected(!isSelected);
                    setSelectedTagsState(selectedTagsState.map().splice(index, 1));
                    return;
                }
            });

        }
        
    }

    return (
        <div>
            {isSelected ? (
                <div onClick={() => {
                    handleChange();
                    setSelected(!isSelected);
                }}>
                    <div className='obsBg' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {iconUrl ? (
                            <>
                                <img
                                    src={iconUrl}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                    alt='tag img'
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {type}
                    </div>
                </div>
            ) : (
                <div className='goldBg' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', borderRadius: '5px', fontWeight: 'bold', color: 'black', cursor: 'pointer' }} onClick={() => {
                    handleChange();
                    setSelected(!isSelected);
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {iconUrl ? (
                            <>
                                <img
                                    src={iconUrl}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                                    alt='tag img'
                                />
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {type}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tag;