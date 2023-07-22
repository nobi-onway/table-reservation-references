import classNames from 'classnames/bind';
import styles from './ServicesMenuPopup.module.scss';
import { Grid } from '@mui/material';
import { Fragment } from 'react';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RoomServiceIcon from '@mui/icons-material/RoomService';

const cx = classNames.bind(styles);

function ServicesMenuPopup({ services, handleClosePopup }) {
    return (
        <div className={`${cx('overlay')}`}>
            <div className={`${cx('wrapper')}`}>
                <div className={`${cx('title')}`}>
                    <div>
                        <RoomServiceIcon
                            sx={{
                                fontSize: '4rem',
                                height: '100%',
                                marginRight: '1rem',
                            }}
                        />
                    </div>
                    <span>Extra Services</span>
                </div>

                <Grid container style={{ padding: '1rem 0' }}>
                    <Grid item sx={8} sm={8} md={8}></Grid>
                    <Grid item sx={4} sm={4} md={4}>
                        <span className={`${cx('table-header')}`}>
                            Total Price
                        </span>
                    </Grid>
                </Grid>

                <Grid container style={{overflowY: 'scroll', maxHeight: '240px'}}>
                    {services.map((service) => (
                        <Fragment>
                            <Grid
                                item
                                sx={8}
                                sm={8}
                                md={8}
                                style={{ padding: '1rem 0' }}
                            >
                                <div className={`${cx('item-detail')}`}>
                                    <span style={{ fontWeight: '700' }}>
                                        {service.name}
                                    </span>
                                </div>
                            </Grid>
                            <Grid item sx={4} sm={4} md={4}>
                                <span className={`${cx('table-row')}`}>
                                    {`$${service.price}`}   
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

export default ServicesMenuPopup;
