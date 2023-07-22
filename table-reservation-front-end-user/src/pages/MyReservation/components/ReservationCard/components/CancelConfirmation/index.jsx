import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import WarningIcon from '@mui/icons-material/Warning';

import styles from './CancelConfirmation.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CancelConfirmation({
    handleCloseConfirmation,
    handleCancelReservation,
}) {
    return (
        <div className={`${cx('overlay')}`}>
            <div className={`${cx('wrapper')}`}>
                <div className={`${cx('flex-center')} ${cx('flex-col')}`}>
                    <span
                        style={{
                            color: '#f1c40f',
                            fontWeight: 700,
                            fontSize: '2.4rem',
                        }}
                    >
                        <WarningIcon sx={{ fontSize: '1.8rem' }} /> Confirmation
                    </span>
                    <span
                        style={{
                            fontWeight: 700,
                            fontSize: '1.6rem',
                            padding: '2rem 0',
                        }}
                    >
                        Do you wish to cancel this reservation?
                    </span>
                </div>
                <div className={`${cx('button-wrapper')} ${cx('m-ver-4')}`}>
                    <Button
                        size="large"
                        variant="contained"
                        color="error"
                        disableElevation
                        onClick={handleCancelReservation}
                    >
                        CONFIRM
                    </Button>
                    <span style={{ margin: '0 .5rem' }}></span>
                    <Button
                        size="large"
                        variant="contained"
                        disableElevation
                        onClick={handleCloseConfirmation}
                    >
                        CANCEL
                    </Button>
                </div>

                <button
                    className={`${cx('close-button')}`}
                    onClick={handleCloseConfirmation}
                >
                    <CloseOutlinedIcon />
                </button>
            </div>
        </div>
    );
}

export default CancelConfirmation;
