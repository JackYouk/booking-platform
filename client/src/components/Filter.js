// imports
import * as React from 'react';
import { CircularProgress, Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_TAGS } from "../utils/queries";
import Tag from '../components/Tag';

const Filter = ({selectedTags}) => {

    const { loading, error, data, refetch } = useQuery(QUERY_TAGS);
    if (error) {
        console.log(error)
    }

    return (
        <div >
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={1}>
                    {data.tags.map(tagData => {
                        if (!tagData.type) {
                            refetch();
                        }
                        return (
                            <Grid item xs="auto" key={tagData._id}>
                                <Tag type={tagData.type} id={tagData._id} selectedIds={selectedTags} iconUrl={tagData.imgPath} />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </div>
    );
}

export default Filter;