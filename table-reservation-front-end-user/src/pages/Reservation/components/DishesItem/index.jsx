import { Grid } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import classNames from 'classnames/bind';
import styles from './DishesItem.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function DishesItem({ item, handleRemoveItem }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleUpdateQuantity = (value) => {
        item.quantity = parseInt(value);
        setQuantity(value);
    };

    return (
        <Grid container sx={{ marginBottom: '2rem' }} spacing={2}>
            <Grid item xs={6} sm={10} md={10}>
                <div className={`${cx('detail-wrapper')}`}>
                    <span className={`${cx('detail')}`}>
                        {`${item.name} - $ ${item.price}`}
                    </span>

                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            handleRemoveItem(item)
                        }}
                        className={`${cx('delete')}`}
                    >
                        <HighlightOffIcon />
                    </button>
                </div>
            </Grid>
            <Grid item xs={6} sm={2} md={2}>
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => handleUpdateQuantity(e.target.value)}
                    className={`${cx('quantity')}`}
                />
            </Grid>
        </Grid>
    );
}

export default DishesItem;
