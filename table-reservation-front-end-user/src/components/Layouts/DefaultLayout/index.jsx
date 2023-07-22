import { Fragment, memo } from 'react';
import Header from '../components/Header';
import Footer from '../../Footer';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            <Header />
            <div style={{height: '100vh'}}>
                {children}
            </div>
            <Footer/>
        </Fragment>
    );
}

export default memo(DefaultLayout);
