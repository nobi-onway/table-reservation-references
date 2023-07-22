import BasicTextFields from '../../pages/Reservation/components/BasicTextFields';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import logo from '../../img/logo.png';

import styles from './LoginModal.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

function LoginModal({ handleModalClose, handleOpenSignUpModal, handleSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={`${cx('overlay')}`}>
            <div className={`${cx('wrapper')}`}>
                <div className={`${cx('flex-center')}`}>
                    <img className={`${cx('logo')}`} src={logo} alt="Logo" />
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields
                        required
                        value={username}
                        handleChange={(e) => setUsername(e.target.value)}
                        type="text"
                        label="username"
                    />
                </div>
                <div className={`${cx('m-col-4')} ${cx('m-ver-4')}`}>
                    <BasicTextFields
                        required
                        value={password}
                        handleChange={(e) => setPassword(e.target.value)}
                        type="password"
                        label="password"
                    />
                </div>
                <div className={`${cx('button-wrapper')} ${cx('m-ver-4')}`}>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        disableElevation
                        onClick={() => handleSignIn({ username, password })}
                    >
                        SIGN IN
                    </Button>
                </div>

                <button
                    onClick={handleModalClose}
                    className={`${cx('close-button')}`}
                >
                    <CloseOutlinedIcon />
                </button>

                <div className={`${cx('flex-center')} ${cx('flex-col')}`}>
                    <button className={`${cx('forgot-password')}`}>
                        Forgot Password?
                    </button>
                    <span className={`${cx('medium-txt')} ${cx('m-col-2')}`}>
                        Don't have an account?{' '}
                        <button
                            onClick={handleOpenSignUpModal}
                            className={`${cx('sign-up')}`}
                        >
                            Sign Up
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
