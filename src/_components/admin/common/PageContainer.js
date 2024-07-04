import React from 'react';
import {Grid} from "@mui/material";

const PageContainer = ({children}) => {
    return (
        <Grid container spacing={2}>
            {children}
        </Grid>
    );
};

export default PageContainer;
