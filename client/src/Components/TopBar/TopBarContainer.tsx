import React from 'react';
import { Badge, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from '../../shared/styles/layout';
import { DynamicModuleLoader } from 'redux-dynamic-modules';
import { connect } from 'react-redux';
import { LayoutModule } from '../../modules/module';
import { toggleSidebar } from './actions/actions';
import { LayoutRootType } from '../../types';
import { fetchLogoutAsync } from '../../shared/auth/actions/actions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface TopBarProps {
    open: boolean;
    toggleOpen: () => void;
    name: string;
    logout: typeof fetchLogoutAsync.request;
}

function TopBar(props: TopBarProps) {
    const { open, toggleOpen, logout, name } = props;
    const classes = useStyles();
    const toggleDrawer = () => {
        toggleOpen();
    };
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    className={clsx(classes.title, {
                        [classes.hide]: open,
                    })}
                >
                    React App
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    className={clsx(classes.title, {
                        [classes.hide]: !open,
                    })}
                >
                    {' '}
                </Typography>
                <div>{name}</div>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton color="inherit" onClick={logout}>
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = (state: LayoutRootType) => {
    return {
        name: state.authState.name,
        open: state.layoutState.sidbarOpened,
    };
};

const dispatchToProps = {
    toggleOpen: toggleSidebar,
    logout: fetchLogoutAsync.request,
};

const ConnectedTopBar = connect(mapStateToProps, dispatchToProps)(TopBar);

export const TopBarContainer = () => (
    <DynamicModuleLoader modules={[LayoutModule]}>
        <ConnectedTopBar></ConnectedTopBar>
    </DynamicModuleLoader>
);
