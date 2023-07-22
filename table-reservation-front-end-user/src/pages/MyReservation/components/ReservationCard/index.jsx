import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './ReservationCard.module.scss';
import classNames from 'classnames/bind';

import { useState, Fragment } from 'react';
import DishesMenuPopup from '../DishesMenuPopup';
import ServicesMenuPopup from '../ServicesMenuPopup';
import { postData } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import CancelConfirmation from './components/CancelConfirmation';
import PaymentModal from './components/PaymentModal';
const cx = classNames.bind(styles);

const notifyMessage = {
    'pending deposit': 'Deposit to complete reservation',
    'pending processing': 'Waiting for processing',
};

function ReservationCard({ reservation, handleOnReservationChange }) {
    const [isOpenDishesMenu, setIsOpenDishesMenu] = useState(false);
    const [isOpenServicesMenu, setIsOpenServicesMenu] = useState(false);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);

    const handleChangeReservationStatus = (status) => {
        postData(`/${reservation.reservationId}/${status}`, '', (res) => {
            if (res) {
                toast.success(`You have ${status} successfully!`);
                handleOnReservationChange();
            }
        });
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
                                {reservation.status === 'pending deposit' && (
                                    <Button
                                        style={{
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                        }}
                                        size="large"
                                        variant="contained"
                                        startIcon={<PaidIcon />}
                                        onClick={() =>
                                            setIsOpenPaymentModal(true)
                                        }
                                    >
                                        Deposit
                                    </Button>
                                )}
                                {reservation.status !== 'done' &&
                                    reservation.status !== 'cancelled' && (
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
                                            onClick={() =>
                                                setIsOpenConfirmation(true)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                {reservation.status === 'done' && (
                                    <Button
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'green',
                                            fontSize: 'small',
                                        }}
                                        disabled
                                        variant="contained"
                                        color="success"
                                    >
                                        DONE
                                    </Button>
                                )}
                                {reservation.status === 'cancelled' && (
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
                                )}
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
            {isOpenConfirmation && (
                <CancelConfirmation
                    handleCloseConfirmation={() => setIsOpenConfirmation(false)}
                    handleCancelReservation={() =>
                        handleChangeReservationStatus('cancel')
                    }
                />
            )}
            {isOpenPaymentModal && (
                <PaymentModal
                    handleClosePayment={() => setIsOpenPaymentModal(false)}
                    handlePayment={() =>
                        handleChangeReservationStatus('deposit')
                    }
                    value={reservation.depositAmount}
                />
            )}
        </Fragment>
    );
}

export default ReservationCard;
