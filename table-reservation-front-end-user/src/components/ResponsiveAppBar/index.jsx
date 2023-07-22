import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginModal from '../LoginModal';
import { Link } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import SignUpModal from '../SignUpModal';
import { postData } from '../../services/apiService';
import { LOGIN_URL } from '../../services/apiConstant';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Auth';
import { toast } from 'react-toastify';
import CancelConfirmation from '../../pages/MyReservation/components/ReservationCard/components/CancelConfirmation';

const pages = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'MAKE RESERVATION', path: '/reservation' },
];

const staffPages = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'MANAGE RESERVATIONS', path: '/staff-reservation' },
];

const guestAvatar = {
    alt: 'Guest Logo',
    src: 'https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png',
};

const userAvatar = {
    alt: 'User Logo',
    src: 'https://www.freepnglogos.com/uploads/chef-png/png-psd-download-chef-cook-vector-illustration-14.png',
};

const staffAvatar = {
    alt: 'Staff Logo',
    src: 'https://cdn-icons-png.flaticon.com/512/3789/3789820.png',
};

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [avatar, setAvatar] = React.useState(guestAvatar);
    const [settings, setSettings] = React.useState([]);
    const {
        token,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isSignUpModalOpen,
        setIsSignUpModalOpen,
    } = React.useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const guestSettings = [
            { title: 'Sign In', handleOnClick: setIsLoginModalOpen },
            { title: 'Sign Up', handleOnClick: setIsSignUpModalOpen },
        ];

        const handleLogout = () => {
            logout();
            navigate('/');
        };

        const userSettings = [
            {
                title: `Hi! ${JSON.parse(token)?.fullName}`,
                handleOnClick: () => {
                    navigate('/user-profile');
                },
            },
            { title: 'Logout', handleOnClick: handleLogout },
        ];

        setAvatar(() =>
            token
                ? JSON.parse(token).username === 'staff'
                    ? staffAvatar
                    : userAvatar
                : guestAvatar,
        );
        setSettings(() => (token ? userSettings : guestSettings));
    }, [token, navigate]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignIn = ({ username, password }) => {
        postData(LOGIN_URL, { username, password }, (res) => {
            if (!res.username) {
                toast.error('Uncorrect username or password', {
                    position: 'top-right',
                });
                return;
            }

            login(JSON.stringify(res));
            const route =
                res.username == 'staff' ? '/staff-reservation' : '/reservation';
            navigate(route);
            setIsLoginModalOpen(false);
            toast.success('Login successfully', {
                position: 'top-right',
            });
        });
    };

    return (
        <Fragment>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            RESTAURANT
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {JSON.parse(token)?.username == 'staff'
                                    ? staffPages.map((page) => (
                                          <Link key={page.name} to={page.path}>
                                              <MenuItem
                                                  onClick={handleCloseNavMenu}
                                              >
                                                  <Typography textAlign="center">
                                                      {page.name}
                                                  </Typography>
                                              </MenuItem>
                                          </Link>
                                      ))
                                    : pages.map((page) => (
                                          <Link key={page.name} to={page.path}>
                                              <MenuItem
                                                  onClick={handleCloseNavMenu}
                                              >
                                                  <Typography textAlign="center">
                                                      {page.name}
                                                  </Typography>
                                              </MenuItem>
                                          </Link>
                                      ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            RESTAURANT
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {JSON.parse(token)?.username === 'staff'
                                ? staffPages.map((page) => (
                                      <Link key={page.name} to={page.path}>
                                          <Button
                                              onClick={handleCloseNavMenu}
                                              sx={{
                                                  my: 2,
                                                  color: 'white',
                                                  display: 'block',
                                              }}
                                          >
                                              {page.name}
                                          </Button>
                                      </Link>
                                  ))
                                : pages.map((page) => (
                                      <Link key={page.name} to={page.path}>
                                          <Button
                                              onClick={handleCloseNavMenu}
                                              sx={{
                                                  my: 2,
                                                  color: 'white',
                                                  display: 'block',
                                              }}
                                          >
                                              {page.name}
                                          </Button>
                                      </Link>
                                  ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt={avatar.alt} src={avatar.src} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            setting.handleOnClick(true);
                                        }}
                                        key={setting.title}
                                    >
                                        <Typography textAlign="center">
                                            {setting.title}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {isLoginModalOpen && (
                <LoginModal
                    handleModalClose={() => {
                        navigate('/');
                        setIsLoginModalOpen(false);
                    }}
                    handleOpenSignUpModal={() => {
                        setIsSignUpModalOpen(true);
                        setIsLoginModalOpen(false);
                    }}
                    handleSignIn={handleSignIn}
                />
            )}

            {isSignUpModalOpen && (
                <SignUpModal
                    handleModalClose={() => {
                        setIsSignUpModalOpen(false);
                    }}
                    handleOpenSignInModal={() => {
                        setIsSignUpModalOpen(false);
                        setIsLoginModalOpen(true);
                    }}
                />
            )}
        </Fragment>
    );
}
export default ResponsiveAppBar;
