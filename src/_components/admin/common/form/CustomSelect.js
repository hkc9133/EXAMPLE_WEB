import React from 'react';
import {useController} from "react-hook-form";
import {MenuItem, Select, TextField} from "@mui/material";


const CustomSelect = ({name, rules, control, list,nullAllow=true, variant = "outlined", sx, ...props}) => {
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
            select
            variant={variant}
            error={error}
            helperText={error?.message}
            SelectProps={{
                // displayEmpty: true,
                // renderValue: (selected) => {
                //     console.log(selected)
                //     if (!selected) {
                //         return props.label;
                //     }
                //     return selected;
                // }
            }}
            {...field}
            sx={{
                '& .MuiInputBase-root': {
                    minHeight: '2em',
                },
                ...sx,
            }}
            {...props}
        >
            {nullAllow && (
                <MenuItem value="">
                    선택 안 함
                </MenuItem>
            )}
            {list.map((item) => (
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            ))}
        </TextField>
    );
};

export default CustomSelect;
