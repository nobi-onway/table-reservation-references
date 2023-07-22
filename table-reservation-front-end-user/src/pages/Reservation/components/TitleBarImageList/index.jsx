import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function TitlebarImageList({
    itemData,
    title,
    handleOnSelected,
    selectedVenue,
}) {
    return (
        <ImageList sx={{ width: '70%', height: 250 }}>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader
                    sx={{ fontSize: 'medium', color: '#1976d2' }}
                    component="div"
                >
                    {title}
                </ListSubheader>
            </ImageListItem>
            {itemData.map((item) => (
                <ImageListItem
                    sx={{
                        overflowY: 'hidden',
                        scrollbarWidth: 'none',
                        opacity: selectedVenue.name === item.name ? 1 : 0.5,
                    }}
                    key={item.img}
                >
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        sx={{ fontWeight: 700 }}
                        title={item.name}
                        subtitle={`Occupancy: ${item.capacity} guests`}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'red' }}
                                aria-label={`info about ${item.name}`}
                                onClick={() => {
                                    handleOnSelected(item);
                                }}
                            >
                                {selectedVenue.name === item.name ? (
                                    <CheckBoxIcon />
                                ) : (
                                    <CheckBoxOutlineBlankIcon />
                                )}
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
