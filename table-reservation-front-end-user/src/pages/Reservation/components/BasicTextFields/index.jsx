import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({
    required,
    readOnly,
    disabled,
    label,
    type,
    handleChange,
    value,
}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                value={value}
                onChange={handleChange}
                required={required}
                readOnly={readOnly}
                disabled={disabled}
                id="outlined-basic"
                label={label}
                variant="outlined"
                type={type}
            />
        </Box>
    );
}
