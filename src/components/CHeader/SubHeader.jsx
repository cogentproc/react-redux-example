import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class SubHeader extends Component {
  render() {
    // const { classes } = this.props;
    const { application, applicationDetail } = this.props;
    var subHeaderUI = [];
    if (applicationDetail.application_detail_form.show_hide_menu !== 'initiate_hide') {
      if (application.application !== '') {
        var date = new Date(application.application.start_date);
        subHeaderUI.push(
          <AppBar key="subHeaderComp" style={{ background: '#FFFFF0' }} position="static">
            <Toolbar>
              <Grid container justify="center" spacing={10}>
                <Grid key={1} item>
                  <Typography color="primary" variant="body2">
                    <b>
                      {application.application.user_name}
                      {application.application.user_rank !== '' ? ',' : ''}
                    </b>
                    {' '}
                    <br />
                    {application.application.user_rank}
                    {application.application.user_dept !== '' ? ',' : ''}
                    {application.application.user_dept}
                  </Typography>
                </Grid>
                <Grid key={2} item>
                  <Typography color="primary" variant="body2">
                    <Typography color="primary" variant="body2" align="left" style={{ float: 'left', fontWeight: 'bold' }}>
                      Started On
                    </Typography>
                    {`: ${date.toDateString()} ${date.toLocaleTimeString()}`}
                    {' '}
                    <br />
                    <Typography color="primary" variant="body2" align="left" style={{ float: 'left', fontWeight: 'bold' }}>Title</Typography>
                    {`: ${application.application.title}`}
                  </Typography>
                </Grid>
                <Grid key={3} item>
                  <Typography color="primary" variant="body2" align="left" style={{ float: 'right' }}>
                    <Typography color="primary" variant="body2" align="left" style={{ float: 'left', fontWeight: 'bold' }}>
                      Your Role
                    </Typography>
                    {`: ${applicationDetail.headerRoleTitle}`}
                    {' '}
                    {localStorage.getItem('is_deputy1') === 'true' ? ' (Deputy1)' : ''}
                    {' '}
                    {localStorage.getItem('is_deputy2') === 'true' ? ' (Deputy2)' : ''}
                    <br />
                    {applicationDetail.headerTaskTitle !== ''
                      ? `Your Task: ${applicationDetail.headerTaskTitle}` : ''}
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>,
        );
      }
    }

    return (
      <div>
        {subHeaderUI}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  application: state.application,
  applicationDetail: state.applicationDetail,
});
export default connect(mapStateToProps)(SubHeader);
