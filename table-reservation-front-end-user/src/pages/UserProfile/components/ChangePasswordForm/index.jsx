import classNames from "classnames/bind";
import styles from "./ChangePassForm.module.scss"
import { Grid } from "@mui/material";
import BasicTextFields from "../../../Reservation/components/BasicTextFields";
import { useContext, useState, useRef } from "react";
import Paper from '@mui/material/Paper';
import OutlinedButton from "../../../Reservation/components/OutlinedButton";
import { styled } from '@mui/material/styles';
import { putData } from "../../../../services/apiService";
import { ACCOUNT_UPDATE } from "../../../../services/apiConstant";
import { AuthContext } from "../../../../store/Auth";

const cx = classNames.bind(styles)

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    borderRadius: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
}));

function ChangePasswordForm()
{
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const { token } = useContext(AuthContext);

    const userRef = useRef(JSON.parse(token));

    const handleChangePassword = () => {
        const newData = {
            fullName: userRef.current.fullName,
            email: userRef.current.email,
            phone: userRef.current.phone,
            password: newPassword
        }

        putData(`${ACCOUNT_UPDATE}/${userRef.current.username}`, newData, (res) => {
            console.log(res)
        })
    }

    return (
        <div className={`${cx('wrapper')}`}>
            <form className={`${cx('form')}`}>
                <Grid container spacing={2} sx={{width: "50vw"}}>
                    <Grid item sm={12} md={12}>
                        <BasicTextFields
                            value={currentPassword}
                            handleChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            label="Current password"
                            type="password"
                        />
                    </Grid>
                    <Grid item sm={12} md={12}>
                        <BasicTextFields
                            value={newPassword}
                            handleChange={(e) => setNewPassword(e.target.value)}
                            required
                            label="New password"
                            type="password"
                        />
                    </Grid>
                    <Grid item sm={12} md={12}>
                        <BasicTextFields
                            value={confirmNewPassword}
                            handleChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                            label="Confirm new password"
                            type="password"
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={12}>
                        <Item>
                            <OutlinedButton
                                onClick={handleChangePassword}
                                label="Change password"
                            />
                        </Item>
                    </Grid>
                </Grid>
            </form>
            
        </div>
    )
}

export default ChangePasswordForm