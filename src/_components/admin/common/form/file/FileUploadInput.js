import React, {useEffect} from 'react';
import {Box, Button, Grid, Stack, styled, TextField} from "@mui/material";
import {useController, useFieldArray, useWatch} from "react-hook-form";
import style from "./FileUploadInput.module.css";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudOffIcon from '@mui/icons-material/CloudOff';

const FileUploadInput = ({name, rules, control, maxCnt = 1, ...props}) => {
    // const {
    //     field: {value, onChange},
    //     fieldState: {isDirty, isTouched, error},
    // } = useController({
    //     name,
    //     rules,
    //     control,
    // });

    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: name, // unique name for your Field Array
        keyName: "fileId"
    });

    const newFileListWatch = useWatch({
        control: control,
        name: name
    })

    useEffect(() => {
        console.log(fields)
    }, [fields])
    useEffect(() => {
        console.log(newFileListWatch)
    }, [newFileListWatch])

    const newFileAdd = (e) => {
        const {files} = e.target;
        console.log(files)
        if (files && files.length > 0) {
            const list = Array.from(files)

            const filessss = list.map((file) => ({
                file
            }));

            console.log(filessss)


            console.log(list)
            append(list)
        }
        e.target.value = null;
    }

    useEffect(() => {
        console.log(maxCnt)
    }, [maxCnt]);
    return (
        <Box component="section" sx={{m: 0}}>
            <Typography variant='subtitle1' color={"rgba(0, 0, 0, 0.6)"}>첨부파일</Typography>
            <Box component="div" sx={{p: 2, border: '1px dashed grey',}}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                    disabled={maxCnt <= fields.length}
                >
                    {(maxCnt <= fields.length) ? "파일 수량 초과" : "파일 추가"}
                    <input className={style.file_input} type="file" onChange={newFileAdd} multiple={true}/>
                </Button>
                {fields.map(({fileId}, i) => (
                    <Grid container key={`${fileId}_name`} xs={12}>
                        <Grid item xs={10}>
                            {newFileListWatch && newFileListWatch[i] && newFileListWatch[i].name && (
                                <>
                                    <Typography variant='subtitle2' align={"left"}
                                                sx={{lineHeight: '2.6'}}>{newFileListWatch[i].name}</Typography>
                                </>
                            )}
                        </Grid>
                        <Grid item>
                            <Stack spacing={1} direction="row">
                                <Button variant="contained" color="primary" size="small">다운로드
                                    <DownloadIcon/>
                                </Button>
                                <Button
                                    variant="contained" color="warning" size="small"
                                    onClick={() => {
                                        remove(i)
                                    }}
                                >
                                    삭제
                                    <DeleteIcon/>
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Box>
    );
};

export default FileUploadInput;
