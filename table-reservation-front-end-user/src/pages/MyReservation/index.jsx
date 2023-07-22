import { Fragment, useEffect, useState } from 'react';
import LabTabs from './components/LabTabs';
import ReservationCard from './components/ReservationCard';
import { getData } from '../../services/apiService';
import { RESERVATION_URL } from '../../services/apiConstant';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../store/Auth';

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

// const defaultReservations = [
//     {
//         imageUrl:
//             'https://pvu.thebluebook.com/inc/img/qp/2214759/lrg_the-orchid-banquet-hall.jpg',
//         createDate: '2023-06-03',
//         checkinTime: '2023-06-12 17:00:00.0',
//         venue: 'Cloudy Area',
//         numberOfGuest: 22,
//         serviceList: [],
//         dishList: [],
//         serviceAmount: 0,
//         dishAmount: 958.56,
//         depositAmount: 315.856,
//         status: 'pending deposit',
//     },
//     {
//         imageUrl:
//             'https://pvu.thebluebook.com/inc/img/qp/2214759/lrg_the-orchid-banquet-hall.jpg',
//         createDate: '2023-06-03',
//         checkinTime: '2023-06-12 17:00:00.0',
//         venue: 'Cloudy Area',
//         numberOfGuest: 22,
//         serviceList: [],
//         dishList: [],
//         serviceAmount: 0,
//         dishAmount: 958.56,
//         depositAmount: 315.856,
//         status: 'pending deposit',
//     },
// ];

function MyReservation() {
    const { token } = useContext(AuthContext);
    const [tabs, setTabs] = useState(defaultTabs);

    const username = useRef(JSON.parse(token).username);

    useEffect(() => {
        const fecthData = () =>
            getData(
                `${RESERVATION_URL}/username?username=${username.current}`,
                (res) => {
                    if (res) {
                        const newTabs = defaultTabs.map((tab) => {
                            const reservations = res.filter((reservation) =>
                                tab.status.includes(reservation.status),
                            );

                            const ChildrenComponent = () => {
                                if (reservations.length === 0)
                                    return <Fragment></Fragment>;

                                return reservations.map(
                                    (reservation, index) => (
                                        <ReservationCard
                                            key={index}
                                            reservation={reservation}
                                            handleOnReservationChange={
                                                fecthData
                                            }
                                        />
                                    ),
                                );
                            };

                            return {
                                ...tab,
                                children: <ChildrenComponent />,
                            };
                        });
                        setTabs(newTabs);
                    }
                },
            );
        fecthData();
    }, []);

    return <LabTabs tabs={tabs} defaultTab={tabs[0]} />;
}

export default MyReservation;
