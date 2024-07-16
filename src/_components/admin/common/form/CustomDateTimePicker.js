import React, {useEffect} from 'react';
import {useController} from "react-hook-form";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const CustomDateTimePicker = ({
                                  name,
                                  rules,
                                  size = "small",
                                  width = '100%',
                                  label,
                                  variant = "standard",
                                  control,
                                  ...props
                              }) => {
    const {
        field,
        fieldState: {isDirty, isTouched, error},
    } = useController({
        name,
        rules,
        control,
    });

    useEffect(() => {
        console.log(error ? true : false)
    }, [error]);

    return (
        <DateTimePicker label={label}
                        ampm={false}
                        format="YYYY/MM/DD HH:mm"
                        slotProps={{
                            textField: {size: size,error:error, helperText: error?.message, variant: variant,readOnly:true},
                            actionBar: {
                                actions: ['clear','accept'],
                            },
                        }}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        sx={{width: width}}
                        {...field}
                        {...props}

        />
    );
};

export default CustomDateTimePicker;
