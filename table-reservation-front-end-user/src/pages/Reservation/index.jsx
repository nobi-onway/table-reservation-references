import { ServiceForm, TableForm } from './components';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

import styles from './Reservation.module.scss';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    borderRadius: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
}));
function Reservation() {
    const [reservationId, setReservationId] = useState(null);

    const handleOpenServiceForm = (reservationId) => {
        setReservationId(reservationId);
    };

    const handleCloseServiceForm = () => {
        setReservationId(null);
    };

    return (
        <div className={`${cx('wrapper')}`}>
            <Grid container spacing={0} className={`${cx('form')}`}>
                <Grid item xs={12}>
                    <Item>
                        {reservationId || (
                            <TableForm
                                handleSuccessNotify={() =>
                                    toast.success(
                                        `Making reservation successfully!`,
                                    )
                                }
                                handleFailNotify={() =>
                                    toast.error(`Making reservation fail!`)
                                }
                                handleOpenServiceForm={handleOpenServiceForm}
                            />
                        )}
                        {reservationId && (
                            <ServiceForm
                                reservationId={reservationId}
                                handleCloseServiceForm={handleCloseServiceForm}
                            />
                        )}
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}

export default Reservation;
