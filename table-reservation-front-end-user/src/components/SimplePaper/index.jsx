import * as React from 'react';
import Box from '@mui/material/Box';
import MultiActionAreaCard from '../MultiActionAreaCard';

export default function SimplePaper({ halls }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 1,
                    width: 256,
                    height: 256,
                },
            }}
        >
            {halls.map((hall, index) => (
                <MultiActionAreaCard key={index} hall={hall} />
            ))}
        </Box>
    );
}
