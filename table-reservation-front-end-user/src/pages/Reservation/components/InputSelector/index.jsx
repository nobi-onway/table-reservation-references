import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function InputSelector({ label, options, defaultSelection }) {
    const [value, setValue] = useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id={`simple-select-required-${label}`}>
                {label}
            </InputLabel>
            <Select
                sx={{ textAlign: 'left' }}
                labelId={`simple-select-required-${label}`}
                id="simple-select-required"
                value={value}
                label={`${label} *`}
                onChange={handleChange}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default InputSelector;
