import Home from "../pages/Home";
import Reservation from "../pages/Reservation";
import About from "../pages/About";
import ManageReservation from "../pages/ManageReservation";
import UserProfile from "../pages/UserProfile";

const guestRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
]

const userRoutes = [
    {
        path: '/reservation',
        component: Reservation,
    },
    {
        path: '/user-profile',
        component: UserProfile
    },
    {
        path: '/staff-reservation',
        component: ManageReservation
    }
]

export { guestRoutes, userRoutes }