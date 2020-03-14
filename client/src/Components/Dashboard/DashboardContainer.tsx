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
import { AuthMainStateType } from '../../shared/auth/types';
import * as actionTypes from '../../shared/auth/actions/actions';
import { useStyles } from '../../shared/styles/layout';
// import { Dashboard } from '../pages/dashboard/components/dahsboard';

import { mainListItems, secondaryListItems } from './mods/List';
import Chart from './mods/Chart';
import Deposits from './mods/Deposits';
import Orders from './mods/Orders';
import Copyright from '../common/Copyright';

type Props = {
    isLoggedIn: boolean;
    name: string;
    logout: typeof actionTypes.fetchLogoutAsync.request;
};

const Dashboard = (props: Props) => {
    const match = useRouteMatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { isLoggedIn } = props;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return isLoggedIn ? (
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

export const DashboardContainer = connect(mapStateToProps, dispatchToProps)(Dashboard);
