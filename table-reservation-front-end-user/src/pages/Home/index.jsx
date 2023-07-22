import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={`${cx('wrapper')}`}>
            <span className={`${cx('title')}`}>Grand Restaurant</span>
            <span className={`${cx('description')}`}>
                Bring magic into every corner of your tasty dish
            </span>
        </div>
    );
}

export default Home;
