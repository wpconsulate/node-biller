import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    AppBar,
    Badge,
    Box,
    Container,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    IconButton,
    Link,
    List,
    Paper,
    Toolbar,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AuthMainStateType } from '../shared/auth/types';
import * as actionTypes from '../shared/auth/actions/actions';
import { TopBarContainer } from '../Components/TopBar/TopBarContainer';
import { AppContainer } from '../Components/App/AppContainer';
import { useStyles } from '../shared/styles/layout';
import { SidebarContainer } from '../Components/Sidebar/SidebarContainer';
// import { Dashboard } from '../pages/dashboard/components/dahsboard';

import { mainListItems, secondaryListItems } from '../Components/Dashboard/mods/List';
import Chart from '../Components/Dashboard/mods/Chart';
import Deposits from '../Components/Dashboard/mods/Deposits';
import Orders from '../Components/Dashboard/mods/Orders';
import Copyright from '../Components/common/Copyright';

type Props = {
    isLoggedIn: boolean;
    name: string;
    logout: typeof actionTypes.fetchLogoutAsync.request;
};

const old = () => (
    <>
        <TopBarContainer />
        <SidebarContainer />
        <AppContainer>
            <Switch>
                {/* <Redirect exact from={`${match.url}`} to={`${match.url}/dashboard`} /> */}
                {/* <Route exact path={`${match.url}/dashboard`} render={() => <Dashboard />} /> */}
            </Switch>
        </AppContainer>
    </>
);

const Home = (props: Props) => {
    const match = useRouteMatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { isLoggedIn } = props;
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return isLoggedIn ? (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart />
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Deposits />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Orders />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    );
};

const mapStateToProps = (state: AuthMainStateType) => {
    return {
        isLoggedIn: state.authState.isLoggedIn,
        name: state.authState.name,
    };
};

const dispatchToProps = {
    logout: actionTypes.fetchLogoutAsync.request,
};

export const HomeContainer = connect(mapStateToProps, dispatchToProps)(Home);
