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
import CustomDateTimePicker from "@/components/admin/common/form/CustomDateTimePicker";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import dayjs from "dayjs";

const searchFieldList = [
    {label: "제목", value: "title"},
    {label: "본문", value: "content"},
]
const pcFieldList = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"},
]
const mobileFieldList = [
    {label: "사용", value: "Y"},
    {label: "미사용", value: "N"},
]

const PopupSearch = () => {

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
            pcYn: '',
            mobileYn: '',
            start: null,
            end: null,
        }
    });

    useEffect(() => {
        console.log(errors)
    }, [errors]);

    const searchValueWatch = watch("searchValue")
    const startWatch = watch("start")
    const endWatch = watch("end")

    useEffect(() => {
        if (searchParams.size == 0) {
            reset()
        }
    }, [searchParams]);

    const search = (data) => {
        const param = {
            ...data,
            start: data.start ? dayjs(data.start).format("YYYY-MM-DD HH:mm:ss") : "",
            end: data.end ? dayjs(data.end).format("YYYY-MM-DD HH:mm:ss") : "",
            [data.searchField]: data.searchValue
        }
        console.log(data)
        console.log(param)
        const queryString = qs.stringify(param);
        replace(`${pathname}?${queryString}`);
    }

    return (
        <form onSubmit={handleSubmit(search)} autoComplete="">
            <Grid container sx={{maxWidth: 1000}}>
                <Grid container sx={{marginBottom: 1.5}} spacing={1}>
                    <Grid item xs={3.5}>
                        <CustomDateTimePicker control={control} name={"start"} label={"시작일"} variant={'outlined'}
                                              maxDateTime={endWatch}
                                              rules={{
                                                  required: endWatch ? "기간 선택 시 시작일, 종료일 모두 입력해야합니다" : false,
                                                  validate: (date) => endWatch ? (date <= endWatch ? true : "기간 선택 시 시작일은 종료일보다 이전이어야 합니다2") : true
                                              }}
                        />
                    </Grid>
                    <Grid item xs={3.5}>
                        <CustomDateTimePicker control={control} name={"end"} label={"종료일"} variant={'outlined'}
                                              minDateTime={startWatch}
                                              rules={{
                                                  required: startWatch ? "기간 선택 시 시작일, 종료일 모두 입력해야합니다" : false,
                                                  validate: (date) => endWatch ? (date >= startWatch ? true : "기간 선택 시 종료일은 시작일보다 이후이어야 합니다") : true
                                              }}
                        />
                    </Grid>
                    <Grid item xs={1.5}>
                        <CustomSelect control={control} name={"pcYn"} size={"small"} label={"PC"}
                                      list={pcFieldList}
                                      sx={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={1.5}>
                        <CustomSelect control={control} name={"mobileYn"} size={"small"} label={"MOBILE"}
                                      list={mobileFieldList}
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

export default PopupSearch;
