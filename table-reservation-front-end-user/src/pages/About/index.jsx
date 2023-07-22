import classNames from 'classnames/bind';
import styles from './About.module.scss';
import dish_menu from '../../img/dish_menu.png';
import service_menu from '../../img/service_menu.png';

const cx = classNames.bind(styles);

function About() {
    return (
        <div>
            <div className={`${cx('wrapper')}`}>
                <img
                    className={`${cx('menu-img')}`}
                    alt="dish-menu"
                    src={dish_menu}
                />
                <img
                    className={`${cx('menu-img')}`}
                    alt="service-menu"
                    src={service_menu}
                />
            </div>
        </div>
    );
}

export default About;
