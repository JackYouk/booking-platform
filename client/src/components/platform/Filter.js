// imports
import * as React from 'react';
import { CircularProgress, Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_TAGS } from "../../utils/queries";
import Tag from './Tag';
import Searchbar from './Searchbar';

const Filter = ({selectedTagsState, setSelectedTagsState}) => {

    const { loading, error, data, refetch } = useQuery(QUERY_TAGS);
    if (error) {
        console.log(error)
    }

    return (
        <div>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container justifyContent={'center'} spacing={3}>
                    {/* <Grid item xs="auto">
                        <Searchbar />
                    </Grid> */}
                     
                    {data.tags.map(tagData => {
                        if (!tagData.type) {
                            refetch();
                        }
                        return (
                            <Grid item xs="auto" key={tagData._id}>
                                <Tag type={tagData.type} id={tagData._id} selectedTagsState={selectedTagsState} setSelectedTagsState={setSelectedTagsState} iconUrl={tagData.imgPath} />
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </div>
    );
}

export default Filter;