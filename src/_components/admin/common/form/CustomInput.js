import React from 'react';
import {useController} from "react-hook-form";
import {TextField} from "@mui/material";

const CustomInput = ({name, rules, control,variant="standard", ...props}) => {
    const {
        field,
        fieldState: {isDirty, isTouched, error},
    } = useController({
        name,
        rules,
        control,
    });
    return (
        <TextField
            error={error}
            {...field}
            // InputProps={{
            //     sx: {
            //         border: `1px solid ${error ? "red" : "green"}`, //간단한 에러처리
            //     },
            // }}
            variant={variant}
            {...props}
        />
    );
};

export default CustomInput;
