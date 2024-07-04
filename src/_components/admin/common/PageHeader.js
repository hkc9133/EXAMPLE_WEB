import React from 'react';
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

const PageHeader = ({title,desc}) => {
    return (
        <Grid item xs={12}
              sx={{paddingBottom:1}}
        >
            <Typography variant='h5'>
                {title}
            </Typography>
            <Typography variant='body1'>
                {desc}
            </Typography>
        </Grid>
    );
};

export default PageHeader;
