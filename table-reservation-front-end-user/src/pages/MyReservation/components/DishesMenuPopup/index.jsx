import classNames from 'classnames/bind';
import styles from './DishesMenuPopup.module.scss';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { Grid } from '@mui/material';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function DishesMenuPopup({ dishes, handleClosePopup }) {
    return (
        <div className={`${cx('overlay')}`}>
            <div className={`${cx('wrapper')}`}>
                <div className={`${cx('title')}`}>
                    <div>
                        <RestaurantMenuIcon
                            sx={{
                                fontSize: '4rem',
                                height: '100%',
                                marginRight: '1rem',
                            }}
                        />
                    </div>
                    <span>Extra Dishes</span>
                </div>

                <Grid container style={{ padding: '1rem 0' }}>
                    <Grid item sx={6} sm={6} md={6}></Grid>
                    <Grid item sx={2} sm={2} md={2}>
                        <span className={`${cx('table-header')}`}>
                            Quantity
                        </span>
                    </Grid>
                    <Grid item sx={4} sm={4} md={4}>
                        <span className={`${cx('table-header')}`}>
                            Total Price
                        </span>
                    </Grid>
                </Grid>

                <Grid container style={{overflowY: 'scroll', maxHeight: '240px'}}>
                    {dishes.map((dish) => (
                        <Fragment>
                            <Grid
                                item
                                sx={6}
                                sm={6}
                                md={6}
                                style={{ padding: '1rem 0' }}
                            >
                                <div className={`${cx('item-detail')}`}>
                                    <span style={{ fontWeight: '700' }}>
                                        {dish.name}
                                    </span>
                                    <span style={{ fontSize: 'medium' }}>
                                        {`$${dish.totalPrice / dish.quantity}`}
                                    </span>
                                </div>
                            </Grid>
                            <Grid item sx={2} sm={2} md={2}>
                                <div className={`${cx('table-row')}`}>
                                    <input
                                        readOnly
                                        type="number"
                                        min={1}
                                        value={dish.quantity}
                                        className={`${cx('item-quantity')}`}
                                    />
                                </div>
                            </Grid>
                            <Grid item sx={4} sm={4} md={4}>
                                <span className={`${cx('table-row')}`}>
                                    {`$${dish.totalPrice}`}
                                </span>
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>

                <button
                    onClick={handleClosePopup}
                    className={`${cx('close-button')}`}
                >
                    <CloseOutlinedIcon />
                </button>
            </div>
        </div>
    );
}

export default DishesMenuPopup;
