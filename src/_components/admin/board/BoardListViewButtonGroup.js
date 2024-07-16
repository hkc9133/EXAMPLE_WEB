'use client';
import React from 'react';
import {Button, Grid, Stack} from "@mui/material";
import {usePathname} from "next/navigation";

const BoardListViewButtonGroup = () => {
    const pathname = usePathname();
    return (
        <Grid container>
            <Grid item xs={12} sx={{mb: 1}}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" href={`${pathname}/write`}>추가</Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default BoardListViewButtonGroup;
