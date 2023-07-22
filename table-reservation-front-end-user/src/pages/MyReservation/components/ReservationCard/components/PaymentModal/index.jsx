import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import styles from './PaymentModal.module.scss';
import classNames from 'classnames/bind';
import { PayPalButtons } from '@paypal/react-paypal-js';

const cx = classNames.bind(styles);

function PaymentModal({ handleClosePayment, handlePayment, value }) {
    return (
        <div className={`${cx('overlay')}`}>
            <div className={`${cx('wrapper')}`}>
                <div className={`${cx('flex-center')} ${cx('flex-col')}`}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: Math.round(value),
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                handlePayment();
                            });
                        }}
                    />
                </div>
                <button
                    className={`${cx('close-button')}`}
                    onClick={handleClosePayment}
                >
                    <CloseOutlinedIcon />
                </button>
            </div>
        </div>
    );
}

export default PaymentModal;
