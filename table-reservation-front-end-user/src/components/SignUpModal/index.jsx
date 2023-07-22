import BasicTextFields from '../../pages/Reservation/components/BasicTextFields';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import logo from '../../img/logo.png';

import styles from './SignUpModal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SignUpModal({ handleModalClose, handleOpenSignInModal }) {
    return (
        <div className={`${cx('overlay')}`}>
            <div className={`${cx('wrapper')}`}>
                <div className={`${cx('flex-center')}`}>
                    <img className={`${cx('logo')}`} src={logo} alt="Logo" />
                </div>
                <div className={`${cx('title')}`}>
                    <span>Sign up to reserve table and enjoy our service</span>
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields required type="string" label="username" />
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields
                        required
                        type="password"
                        label="password"
                    />
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields
                        required
                        type="password"
                        label="confirm password"
                    />
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields required type="text" label="full name" />
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields required type="email" label="email" />
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields required type="text" label="phone" />
                </div>
                <div className={`${cx('button-wrapper')} ${cx('m-ver-4')}`}>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        disableElevation
                    >
                        SIGN UP
                    </Button>
                </div>

                <button
                    onClick={handleModalClose}
                    className={`${cx('close-button')}`}
                >
                    <CloseOutlinedIcon />
                </button>

                <div className={`${cx('flex-center')} ${cx('flex-col')}`}>
                    <span className={`${cx('medium-txt')} ${cx('m-col-4')}`}>
                        Have an account?{' '}
                        <button
                            onClick={handleOpenSignInModal}
                            className={`${cx('sign-in')}`}
                        >
                            Sign In
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;
