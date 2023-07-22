import { Fragment, useEffect, useState } from 'react';
import LabTabs from '../MyReservation/components/LabTabs';
import { getData } from '../../services/apiService';
import { RESERVATION_URL } from '../../services/apiConstant';
import ManageReservationCard from './components/ManageReservationCard';

const defaultTabs = [
    {
        value: 'Reserved',
        label: 'Reserved',
        status: ['done', 'reserved'],
    },
    {
        value: 'pending deposit',
        label: 'Pending',
        status: ['pending processing', 'pending deposit'],
    },
    {
        value: 'Canceled',
        label: 'Canceled',
        status: ['cancelled'],
    },
];

function ManageReservation() {
    const [tabs, setTabs] = useState(defaultTabs);

    useEffect(() => {
        const fetchData = () =>
            getData(`${RESERVATION_URL}`, (res) => {
                if (res) {
                    const newTabs = defaultTabs.map((tab) => {
                        const reservations = res.filter((reservation) =>
                            tab.status.includes(reservation.status),
                        );

                        const ChildrenComponent = () => {
                            if (reservations.length === 0)
                                return <Fragment></Fragment>;

                            return reservations.map((reservation, index) => (
                                <ManageReservationCard
                                    key={index}
                                    reservation={reservation}
                                    handleOnReservationChange={fetchData}
                                />
                            ));
                        };

                        return {
                            ...tab,
                            children: <ChildrenComponent />,
                        };
                    });
                    setTabs(newTabs);
                }
            });

        fetchData();
    }, []);

    return <LabTabs tabs={tabs} defaultTab={tabs[0]} />;
}

export default ManageReservation;
