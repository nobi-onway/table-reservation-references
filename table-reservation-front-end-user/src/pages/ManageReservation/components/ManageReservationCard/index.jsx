import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import styles from './ManageReservationCard.module.scss';
import classNames from 'classnames/bind';

import { useState, Fragment } from 'react';
import DishesMenuPopup from '../../../MyReservation/components/DishesMenuPopup';
import ServicesMenuPopup from '../../../MyReservation/components/ServicesMenuPopup';
import { postData } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

const notifyMessage = {
    'pending deposit': 'Reservation has not yet paid',
    'pending processing': 'Waiting for processing',
};

function ManageReservationCard({ reservation, handleOnReservationChange }) {
    const [isOpenDishesMenu, setIsOpenDishesMenu] = useState(false);
    const [isOpenServicesMenu, setIsOpenServicesMenu] = useState(false);

    const handleChangeReservationStatus = (status) => {
        postData(`/${reservation.reservationId}/${status}`, '', (res) => {
            console.log(reservation, res);
            if (res) {
                toast.success(`You have ${status} successfully!`);
                handleOnReservationChange();
            }
        });
    };

    const actionButton = {
        done: (
            <Button
                style={{
                    color: 'white',
                    backgroundColor: 'green',
                    fontSize: 'small',
                    width: 100,
                }}
                disabled
                variant="contained"
                color="success"
            >
                DONE
            </Button>
        ),
        'pending deposit': (
            <Fragment>
                <Button
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        background: 'green',
                        color: 'white',
                    }}
                    size="large"
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    disabled
                >
                    Deposit processing
                </Button>
            </Fragment>
        ),
        'pending processing': (
            <Fragment>
                <Button
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                    }}
                    size="large"
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleChangeReservationStatus('approve')}
                >
                    Approve
                </Button>
                <Button
                    style={{
                        backgroundColor: 'red',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        marginLeft: '1rem',
                    }}
                    size="large"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleChangeReservationStatus('cancel')}
                >
                    Cancel
                </Button>
            </Fragment>
        ),
        cancelled: (
            <Button
                style={{
                    color: 'white',
                    backgroundColor: 'red',
                    fontSize: 'small',
                }}
                disabled
                variant="contained"
                color="success"
            >
                CANCELLED
            </Button>
        ),
        reserved: (
            <Button
                style={{
                    color: 'white',
                    backgroundColor: '#f1c40f',
                    fontSize: 'small',
                }}
                disabled
                variant="contained"
                color="success"
            >
                RESERVED
            </Button>
        ),
    };

    return (
        <Fragment>
            <Grid container className={`${cx('wrapper')} ${cx('m-b-4')}`}>
                <Grid item sm={2} md={2}>
                    <div className={`${cx('image-wrapper')}`}>
                        <img alt="venue" src={reservation.imageUrl} />
                    </div>
                </Grid>
                <Grid item sm={4} md={4} style={{ padding: '1rem 0' }}>
                    <div className={`${cx('reservation-wrapper')}`}>
                        <div className={`${cx('reservation-detail')}`}>
                            <CalendarMonthIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Date:
                                </span>
                                {new Date(
                                    reservation.checkinDate,
                                ).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className={`${cx('reservation-detail')}`}>
                            <AccessTimeIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Time:
                                </span>
                                {reservation.checkinTime}
                            </span>
                        </div>
                        <div className={`${cx('reservation-detail')}`}>
                            <ShareLocationIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Venue:
                                </span>
                                {reservation.venue}
                            </span>
                        </div>
                        <div className={`${cx('reservation-detail')}`}>
                            <PersonOutlineIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Persons:
                                </span>
                                {reservation.numberOfGuest} persons
                            </span>
                        </div>
                    </div>
                </Grid>
                <Grid item sm={4} md={4} style={{ padding: '1rem 0' }}>
                    <div className={`${cx('reservation-wrapper')}`}>
                        <div className={`${cx('reservation-detail')}`}>
                            <RoomServiceOutlinedIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Service:
                                </span>
                                {reservation.serviceList.length > 0 ? (
                                    <Button
                                        onClick={() =>
                                            setIsOpenServicesMenu(true)
                                        }
                                        sx={{
                                            color: 'black',
                                            fontSize: 'small',
                                        }}
                                    >
                                        View
                                    </Button>
                                ) : (
                                    'None'
                                )}
                            </span>
                        </div>
                        <div className={`${cx('reservation-detail')}`}>
                            <FoodBankOutlinedIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Dishes:
                                </span>
                                {reservation.dishList.length > 0 ? (
                                    <Button
                                        onClick={() =>
                                            setIsOpenDishesMenu(true)
                                        }
                                        sx={{
                                            color: 'black',
                                            fontSize: 'small',
                                        }}
                                    >
                                        View
                                    </Button>
                                ) : (
                                    'None'
                                )}
                            </span>
                        </div>
                        <div className={`${cx('reservation-detail')}`}>
                            <PaymentsOutlinedIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Total estimate:
                                </span>
                                $
                                {reservation.dishAmount +
                                    reservation.serviceAmount}
                            </span>
                        </div>
                        <div className={`${cx('reservation-detail')}`}>
                            <PriceCheckOutlinedIcon />
                            <span className={`${cx('txt-s')}`}>
                                <span className={`${cx('bold')} ${cx('m-4')}`}>
                                    Deposit required:
                                </span>
                                ${reservation.depositAmount}
                            </span>
                        </div>
                    </div>
                </Grid>
                <Grid
                    item
                    sm={2}
                    md={2}
                    style={{
                        display: 'flex',
                        padding: '1rem',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                >
                    <div className={`${cx('option-wrapper')} ${cx('txt-xs')}`}>
                        <span
                            className={`${cx('bold')}`}
                            style={{ color: '#6f7681' }}
                        >
                            {`Created ${new Date(
                                reservation.createDate,
                            ).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}`}
                        </span>
                        <div>
                            <span className={`${cx('notify-message')}`}>
                                {notifyMessage[reservation.status]}
                            </span>
                            <div style={{ display: 'flex' }}>
                                {actionButton[reservation.status]}
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

            {isOpenDishesMenu && (
                <DishesMenuPopup
                    dishes={reservation.dishList}
                    handleClosePopup={() => setIsOpenDishesMenu(false)}
                />
            )}
            {isOpenServicesMenu && (
                <ServicesMenuPopup
                    services={reservation.serviceList}
                    handleClosePopup={() => setIsOpenServicesMenu(false)}
                />
            )}
        </Fragment>
    );
}

export default ManageReservationCard;
