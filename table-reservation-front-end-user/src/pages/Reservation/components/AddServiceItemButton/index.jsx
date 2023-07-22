import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
    Grid,
    Box,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './AddServiceItemButton.module.scss';

const cx = classNames.bind(styles);

function AddServiceItemButton({ label, options, handleAddItem }) {
    const [showOptions, setShowOptions] = useState(false);
    const selectItemRef = useRef(null);

    const handleSelectItem = (item) => {
        handleAddItem(item);
        setShowOptions(false);
    };

    useEffect(() => {
        if (!showOptions) return;

        selectItemRef.current.focus();
        selectItemRef.current.click();
    }, [showOptions]);

    return (
        <Grid container spacing={10}>
            <Grid item xs={2} sm={2} md={2}>
                <Button
                    className={`${cx('add-btn')}`}
                    size="small"
                    variant="outlined"
                    endIcon={<AddIcon />}
                    onClick={() => setShowOptions(true)}
                >
                    ADD
                </Button>
            </Grid>
            {showOptions && (
                <Grid item xs={6} sm={6} md={6}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                {label}
                            </InputLabel>
                            <Select
                                sx={{
                                    width: '100%',
                                    height: '32px',
                                    backgroundColor: '#e8e8e8',
                                    color: 'black',
                                }}
                                ref={selectItemRef}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label={label}
                                onBlur={() => setShowOptions(false)}
                                onChange={(e) =>
                                    handleSelectItem(e.target.value)
                                }
                            >
                                {options.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        value={item}
                                    >{`${item.name} - $ ${item.price}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}

export default AddServiceItemButton;
