import MyReservation from "../MyReservation"
import UserProfileForm from "./components/UserProfileForm"
import LabTabs from "../MyReservation/components/LabTabs"
import ChangePasswordForm from "./components/ChangePasswordForm";

const defaultTabs = [
    {
        value: 'My Profile',
        label: 'My Profile',
        children: <UserProfileForm/>
    },
    {
        value: 'Change Password',
        label: 'Change Password',
        children: <ChangePasswordForm/>
    },
    {
        value: 'My Reservation',
        label: 'My Reservation',
        children: <MyReservation/>
    },
];

function UserProfile()
{
    return (
        // <Fragment>
        //     <UserProfileForm/>
        //     <MyReservation/>
        // </Fragment>
        <LabTabs tabs={defaultTabs} defaultTab={defaultTabs[0]}/>
    )
}

export default UserProfile