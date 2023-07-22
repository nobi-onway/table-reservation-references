import classNames from "classnames/bind";
import styles from './Footer.module.scss'
import CopyrightIcon from '@mui/icons-material/Copyright';

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={`${cx('wrapper')}`}>
            <div className={`${cx('brand-wrapper')}`}>
                <img className={`${cx('brand-img')}`} alt="messgener" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/640px-Facebook_Messenger_logo_2020.svg.png"/>
                <img className={`${cx('brand-img')}`} style={{width: '5.2rem', height: '5.2rem'}} alt="messgener" src="https://bookvexe.vn/wp-content/uploads/2023/04/tong-hop-25-mau-logo-zalo-dep-va-an-tuong_1.jpg"/>
                <img className={`${cx('brand-img')}`} alt="messgener" src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"/>
            </div>
            <span className={`${cx('copy-right')}`}><CopyrightIcon/> 2023 Reservation | All Right Reserved</span>
        </div>
    )
}

export default Footer;