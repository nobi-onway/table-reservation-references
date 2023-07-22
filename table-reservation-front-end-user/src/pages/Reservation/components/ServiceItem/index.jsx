import { Grid } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import classNames from 'classnames/bind';
import styles from './ServiceItem.module.scss';

const cx = classNames.bind(styles);

function ServiceItem({ item, handleRemoveItem }) {
    return (
        <Grid container sx={{ marginBottom: '2rem' }} spacing={2}>
            <Grid item xs={6} sm={10} md={10}>
                <div className={`${cx('detail-wrapper')}`}>
                    <span className={`${cx('detail')}`}>
                        {`${item.name} - $ ${item.price}`}
                    </span>

                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            handleRemoveItem(item);
                        }}
                        className={`${cx('delete')}`}
                    >
                        <HighlightOffIcon />
                    </button>
                </div>
            </Grid>
        </Grid>
    );
}

export default ServiceItem;
