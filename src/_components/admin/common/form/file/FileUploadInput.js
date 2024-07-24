import React, {useEffect} from 'react';
import {Box, Button, Grid, Stack, styled, TextField} from "@mui/material";
import {useController, useFieldArray, useWatch} from "react-hook-form";
import style from "./FileUploadInput.module.css";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReplayIcon from '@mui/icons-material/Replay';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import {useModalStore} from "@/store/useModalStore";

const FileUploadInput = ({name,txt,helperText="",oldListName,deleteListName, rules, accept="", control, maxCnt = 1,width='100%', ...props}) => {

    const {onConfirm, onAlert} = useModalStore()

    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: name, // unique name for your Field Array
        keyName: "fileId"
    });

    const {fields: oldFields,append:oldFileAppend, remove: oldRemove} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: oldListName, // unique name for your Field Array
    });

    const {fields: deleteFields,append:deleteFileAppend, remove: deleteRemove} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: deleteListName, // unique name for your Field Array
    });


    const newFileListWatch = useWatch({
        control: control,
        name: name
    })

    const newFileAdd = (e) => {
        const {files} = e.target;
        if (files && files.length > 0) {
            const list = Array.from(files)
            append(list)
        }
        e.target.value = null;
    }
    const handleOldFileDownload = (i) => {
        const file = oldFields[i];
        download(file)
    }

    const handleDeleteFileDownload = (i) =>{
        const file = deleteFields[i];
        download(file)
    }

    const download = (file) =>{
        const link = document.createElement('a');

        link.download = file.name; // this name is used when the user downloads the file
        link.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/resource/download/${file.fileId}`;
        link.click();
        link.remove();
    }

    const handleOldFileDelete = (i) => {
        const deleteFile = oldFields[i];
        deleteFileAppend(deleteFile)
        oldRemove(i)
    }
    const handleOldFileDeleteCancel = (i) => {
        if((fields.length+oldFields.length)+1 > maxCnt){
            onAlert({message:`최대 ${maxCnt}개 까지 가능합니다.`})
        }else{
            const deleteFile = deleteFields[i];

            oldFileAppend(deleteFile)
            deleteRemove(i)
        }
    }
    return (
        <Box component="section" sx={{m: 0,width:width}}>
            <Typography variant='subtitle1' color={"rgba(0, 0, 0, 0.6)"}>{txt}</Typography>
            <Typography variant='subtitle2' color={"red"}>{helperText}</Typography>
            <Box component="div" sx={{p: 2, border: '1px dashed grey'}}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                    disabled={maxCnt <= (fields.length+oldFields.length)}
                >
                    {(maxCnt <= (fields.length+oldFields.length)) ? "파일 수량 초과" : "파일 추가"}
                    <input className={style.file_input} accept={accept} type="file" onChange={newFileAdd} multiple={false}/>
                </Button>
                {oldFields.map((oldFile, i) => (
                    <Grid container key={`${oldFile.id}_name`} xs={12} justifyContent={'space-between'}>
                        <Grid item xs={8}>
                            <Typography variant='subtitle2' align={"left"}
                                        sx={{lineHeight: '2.6'}}>{oldFile.fileOriginName}</Typography>
                        </Grid>
                        <Grid item xs={3} justifyContent={"end"}>
                            <Stack spacing={1} direction="row" justifyContent={"end"}>
                                <Button variant="contained" color="primary" size="small" onClick={() =>{handleOldFileDownload(i)}}>다운로드
                                    <DownloadIcon/>
                                </Button>
                                <Button
                                    variant="contained" color="warning" size="small"
                                    onClick={() => {
                                        handleOldFileDelete(i)
                                    }}
                                >
                                    삭제
                                    <DeleteIcon/>
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                ))}
                {fields.map(({fileId}, i) => (
                    <Grid container key={`${fileId}_name`} xs={12} justifyContent={'space-between'}>
                        <Grid item xs={8}>
                            {newFileListWatch && newFileListWatch[i] && newFileListWatch[i].name && (
                                <>
                                    <Typography variant='subtitle2' align={"left"}
                                                sx={{lineHeight: '2.6'}}>{newFileListWatch[i].name}</Typography>
                                </>
                            )}
                        </Grid>
                        <Grid item xs={3} justifyContent={"end"}>
                            <Stack spacing={1} direction="row" justifyContent={"end"}>
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
                {deleteFields.length > 0 && <hr/>}
                {deleteFields.map((deleteFile, i) => (
                    <Grid container key={`${deleteFile.id}_name`} xs={12} justifyContent={'space-between'}>
                        <Grid item xs={8}>
                            <Typography variant='subtitle2' align={"left"}
                                        sx={{lineHeight: '2.6'}}>{deleteFile.fileOriginName}</Typography>
                        </Grid>
                        <Grid item xs={3} justifyContent={"end"}>
                            <Stack spacing={1} direction="row" justifyContent={"end"}>
                                <Button variant="contained" color="primary" size="small" onClick={() =>{handleDeleteFileDownload(i)}}>다운로드
                                    <DownloadIcon/>
                                </Button>
                                <Button
                                    variant="contained" color="warning" size="small"
                                    onClick={() => {
                                        handleOldFileDeleteCancel(i)
                                    }}
                                >
                                    취소
                                    <ReplayIcon/>
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
