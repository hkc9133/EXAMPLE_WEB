'use client'
import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import CustomSelect from "@/components/admin/common/form/CustomSelect";
import CustomInput from "@/components/admin/common/form/CustomInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {useForm} from "react-hook-form";
import qs from "query-string";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import dayjs from "dayjs";

const searchFieldList = [
    {label: "제목", value: "title"},
    {label: "URL", value: "url"},
]
const ynList = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"},
]

const BannerSearch = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter();

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
    } = useForm({
        defaultValues: {
            searchField: '',
            searchValue: '',
            useYn: '',
        }
    });


    const searchValueWatch = watch("searchValue")

    useEffect(() => {
        if (searchParams.size == 0) {
            reset()
        }
    }, [searchParams]);

    const search = (data) => {
        const param = {
            ...data,
            [data.searchField]: data.searchValue
        }
        const queryString = qs.stringify(param);
        replace(`${pathname}?${queryString}`);
    }

    return (
        <form onSubmit={handleSubmit(search)} autoComplete="">
            <Grid container sx={{maxWidth: 1000}}>
                <Grid container sx={{marginBottom: 1.5}} spacing={1}>
                    <Grid item xs={1.5}>
                        <CustomSelect control={control} name={"useYn"} size={"small"} label={"사용 여부"}
                                      list={ynList}
                                      sx={{width: '100%'}}/>
                    </Grid>
                </Grid>
                <Grid container sx={{marginBottom: 1.5}} spacing={1}>
                    <Grid item xs={3}>
                        <CustomSelect control={control} name={"searchField"} size={"small"} label={"검색 필드"}
                                      list={searchFieldList}
                                      sx={{width: '100%'}}
                                      rules={{
                                          required: searchValueWatch ? "검색 필드를 선택해주세요" : false
                                      }}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <CustomInput sx={{width: '100%'}} control={control} name="searchValue" label="검색어" helperText=""
                                     variant="outlined" size={"small"}
                                     InputProps={{
                                         endAdornment: (
                                             <>
                                                 <InputAdornment position="end">
                                                     <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                                                         <SearchIcon/>
                                                     </IconButton>
                                                 </InputAdornment>
                                                 <InputAdornment position="start">
                                                     <IconButton type="button" sx={{p: '10px'}} onClick={() =>{reset()}}>
                                                         <RestartAltIcon/>
                                                     </IconButton>
                                                 </InputAdornment>
                                             </>
                                         )
                                     }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default BannerSearch;
