import classNames from "classnames/bind";
import styles from "./UserProfileForm.module.scss"
import { Grid } from "@mui/material";
import BasicTextFields from "../../../Reservation/components/BasicTextFields";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../store/Auth";
import { useRef } from "react";
import Paper from '@mui/material/Paper';
import OutlinedButton from "../../../Reservation/components/OutlinedButton";
import { styled } from '@mui/material/styles';
import { putData } from "../../../../services/apiService";
import { ACCOUNT_UPDATE } from "../../../../services/apiConstant";

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

function UserProfileForm()
{
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const { token } = useContext(AuthContext);

    const userRef = useRef(JSON.parse(token));

    useEffect(() => {
        if(!userRef.current) return

        setName(userRef.current.fullName)
        setPhone(userRef.current.phone)
        setEmail(userRef.current.email)

    }, [userRef])

    const handleSaveChange = () => {
        putData(`${ACCOUNT_UPDATE}/${userRef.current.username}`, {fullName: name, email, phone}, (res) => {
            console.log(res)
        })
    }

    return (
        <div className={`${cx('wrapper')}`}>
            <form className={`${cx('form')}`}>
                <Grid container spacing={2} sx={{width: "50vw"}}>
                    <Grid item sm={12} md={12}>
                        <BasicTextFields
                            value={name}
                            handleChange={(e) => setName(e.target.value)}
                            required
                            label="Your name"
                            type="text"
                        />
                    </Grid>
                    <Grid item sm={12} md={12}>
                        <BasicTextFields
                            value={phone}
                            handleChange={(e) => setPhone(e.target.value)}
                            required
                            label="Contact number"
                            type="number"
                        />
                    </Grid>
                    <Grid item sm={12} md={12}>
                        <BasicTextFields
                            value={email}
                            handleChange={(e) => setEmail(e.target.value)}
                            required
                            label="Email"
                            type="email"
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={12}>
                        <Item>
                            <OutlinedButton
                                onClick={handleSaveChange}
                                label="Save Change"
                            />
                        </Item>
                    </Grid>
                </Grid>
            </form>
            
        </div>
    )
}

export default UserProfileForm