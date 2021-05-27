import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ApplicationMessagesComp = (props) => {

  /*
  const { getApplicationDetailForm, getApplication } = props;
  useEffect(() => {
      getApplicationDetailForm(props.application_id, props.role_id);
      getApplication(props.application_id);
  }, [getApplicationDetailForm, getApplication])
  */



  const { getApplication, getApplicationDetailForm, getApplicationMessages, application_id, task_id, role_id } = props;
  useEffect(() => {
    if (task_id !== undefined) {
      getApplicationMessages(application_id, task_id);
    }
    getApplicationDetailForm(props.application_id, props.role_id);
    getApplication(props.application_id);
  }, [getApplication, getApplicationDetailForm, getApplicationMessages, application_id, task_id, role_id]);

  /*
  const handleRequiredFormClick = () => {
    props.setShowForm('required_form', 0);
  };
  const handlePendingApprovalsClick = () => {
    props.setShowForm('pending_approval', 0);
  };
  */

  /*
  var hideRequiredFormButton = false;
  var hidePendingButton = false;
  if (props.submitableFormList.length > 0) {
    if (props.showHideMenu === 'initiate_hide') {
      hideRequiredFormButton = false;
      hidePendingButton = true;
    } else {
      hideRequiredFormButton = true;
      hidePendingButton = false;
    }
  } else {
    hideRequiredFormButton = true;
    hidePendingButton = true;
  }
  */

  var messagesUI = [];
  props.application_detail_messages.forEach((message) => {
    var date = new Date(message.sentdate);
    messagesUI.push(
      <div key={message.id}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <TextField
              value={message.message}
              key={message.id}
              fullWidth
              label="Message"
              rows={10}
              multiline
              disabled
              variant="outlined"
            />
          </GridItem>
        </GridContainer>
        <br />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <TextField
              value={`${date.toDateString()} ${date.toLocaleTimeString()}`}
              key={`sentData${message.id}`}
              fullWidth
              label="Sent At"
              disabled
              variant="outlined"
            />
          </GridItem>
        </GridContainer>
        <br />
        <br />
      </div>,
    );
  });

  return (
    <div>
      <Card>
        <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom>Messages</Typography>
        </div>
        <CardContent>
          {/*
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Button
                onClick={handleRequiredFormClick}
                color="primary"
                round
                style={{ display: hideRequiredFormButton ? 'none' : 'block' }}
              >
                Required Forms
              </Button>
              <Button
                onClick={handlePendingApprovalsClick}
                color="primary"
                round
                style={{ display: hidePendingButton ? 'none' : 'block' }}
              >
                Pending Requests
              </Button>
            </GridItem>
          </GridContainer>
          */}
          <br />
          {messagesUI}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationMessagesComp;
