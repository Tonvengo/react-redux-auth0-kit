import React, { Component } from 'react';
import { Button, AppBar, Toolbar, Avatar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as AuthService from '../../utils/AuthService';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    width: 33,
    height: 33,
  },
  row: {
    display: 'flex',
    justifyContent: 'top',
  },
};

class HeaderView extends Component {

  handleLoginClick = () => {
    AuthService.login();
    this.props.loginRequest();
  };

  handleHomeClick = () => {
    this.props.history.push({pathname: '/'});
  }

  handleLogoutClick = () => {
    this.props.logoutSuccess();
    AuthService.logout(); // careful, this is a static method
    this.props.history.push({ pathname: '/' });
  };

  render() {
    const { auth, classes } = this.props;
    const props = this.props;
    
    return (
      <div className={props.classes.root}>
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>
            <Typography onClick={this.handleHomeClick} variant="title" color="primary" className={props.classes.flex}>
            Predictor
            </Typography>
        {auth.isAuthenticated ? (
          <div className={classes.row}>
            <Avatar alt="profile" src={auth.profile.picture} className={classes.avatar} />
            {/* <span style={{color:"blue"}}>{auth.profile.nickname}</span> */}
            <Button variant="outlined" color="primary" onClick={this.handleLogoutClick}>Logout</Button>
          </div>
        ) : (
          <Button variant="outlined" color="primary" onClick={this.handleLoginClick}>Login</Button>
        )}
        {auth.error && <p>{JSON.stringify(auth.error)}</p>}
        </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(HeaderView);
