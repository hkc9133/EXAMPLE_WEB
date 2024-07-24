'use client';
import React from 'react';
import {Button, Grid, Stack} from "@mui/material";
import {usePathname} from "next/navigation";

const PopupListViewButtonGroup = ({confirmDelete,selected}) => {
    const pathname = usePathname();
    return (
        <Grid container sx={{mt: 2}}>
            <Grid item xs={12} sx={{mb: 1}}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" href={`${pathname}/write`}>추가</Button>
                    <Button variant="contained" onClick={confirmDelete} disabled={selected.length == 0} color={'error'}>선택 삭제</Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default PopupListViewButtonGroup;
