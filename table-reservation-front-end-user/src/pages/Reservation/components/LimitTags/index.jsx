import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function LimitTags({ tags, label }) {
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={tags}
            getOptionLabel={(option) => option.name}
            defaultValue={[]}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder="Favorites" />
            )}
            sx={{ width: '100%', marginBottom: '1.6rem' }}
        />
    );
}
