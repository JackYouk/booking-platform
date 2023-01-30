import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { useQuery } from '@apollo/client';
import { QUERY_TAGS } from '../../utils/queries';

export default function CheckboxesGroup({setFilterState}) {

    const { loading, data } = useQuery(QUERY_TAGS);
    let tagTypes = {};
    if (loading) {
        return (<></>);
    }
    data.tags.map(tag => {
        const key = tag.type;
        tagTypes = {
            ...tagTypes,
            key: false,
        }
    })
    const handleChange = (event) => {
        tagTypes = {
            ...tagTypes,
            [event.target.name]: event.target.checked,
        };
    };



    return (
        <>
            {loading ? (
                <>
                </>
            ) : (
                <Box sx={{ display: 'flex' }}>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            {data.tags.map(tag => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={tagTypes[tag.type]} onChange={handleChange} name={tag.type} />
                                        }
                                        label={tag.type}
                                    />
                                )
                            })}
                        </FormGroup>

                        <FormHelperText></FormHelperText>
                    </FormControl>
                </Box>
            )}
        </>

    );
}