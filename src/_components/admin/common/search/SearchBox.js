'use client'
import React from 'react';
import {Grid} from "@mui/material";
import CustomInput from "@/components/admin/common/form/CustomInput";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import {useForm} from "react-hook-form";
import CustomSelect from "@/components/admin/common/form/CustomSelect";

const SearchBox = () => {
    const {
        register,
        getValues,
        setError,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: {errors}
    } = useForm();

    const search = (data) => {
        console.log(data)

    }
    return (
        <form onSubmit={handleSubmit(search)} autoComplete="">
            <Grid container sx={{marginBottom: 5}} spacing={1}>
                <Grid item xs={1}>
                    <CustomSelect control={control} name={"searchField"} size={"small"} label={"검색 필드"}
                                  list={list}
                                  sx={{width: '100%'}}/>
                </Grid>
                <Grid item xs={3}>
                    <CustomInput sx={{width: '100%'}} control={control} name="searchValue" label="검색어"
                                 helperText="" variant="outlined" size={"small"}
                                 InputProps={{
                                     endAdornment: (
                                         <InputAdornment position="end">
                                             <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                                                 <SearchIcon/>
                                             </IconButton>
                                         </InputAdornment>
                                     ),
                                 }}
                    />
                </Grid>
            </Grid>
        </form>
    )
        ;
};

export default SearchBox;
