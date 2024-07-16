'use client'
import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Button, Grid, Stack} from "@mui/material";
import CustomInput from "@/components/admin/common/form/CustomInput";
import FileUploadInput from "@/components/admin/common/form/file/FileUploadInput";

const UserSetting = ({onSubmit}) => {
    const methods = useForm({
        defaultValues:{
            "field": '232323'
        }
    });
    const {register, setValue,reset, handleSubmit, control} = methods;

    useEffect(() => {
        // reset({"field": '232323'})
        // setValue("field", '232323')
    }, []);

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container xs={12} sx={{'& .MuiTextField-root': {m: 0},}} spacing={1} >
                <Grid item>
                    <CustomInput sx={{ width: '25ch' }} control={control} name="field" label="Helper text" helperText="Some important text"/>
                    <CustomInput sx={{ width: '25ch' }} control={control} name="field" label="Helper text" helperText="Some important text"/>
                    <CustomInput sx={{ width: '25ch' }} control={control} name="field" label="Helper text" helperText="Some important text"/>
                </Grid>
                <Grid item xs={12}>
                    <FileUploadInput control={control} name="fileList"/>
                </Grid>
                <Grid item>
                    <Stack spacing={1} direction="row">
                        <Button type={"submit"} variant="contained">Submit</Button>
                        <Button type={"button"} variant="outlined" color="error">Cancel</Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default UserSetting;
