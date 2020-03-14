import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from '../../shared/styles/layout';
import Copyright from '../common/Copyright';

export function AppContainer(props: React.PropsWithChildren<{}>) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.container}>{props.children}</div>
                <Box pt={1}>
                    <Copyright />
                </Box>
            </main>
        </React.Fragment>
    );
}
