import React, { useState, useEffect, useReducer } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const Action = (props) => {

    const [actionMsgIDs, setActionMsgIDs] = useState([]);
    const [taskID, setTaskID] = useState(0);
    const [actions, setActions] = useState([]);
    const [currentExpansionPanel, setCurrentExpansionPanel] = useState('');
    const [allFormsCompleted, setAllFormsCompleted] = useState(false);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

    const { getApplicationDetailForm, getApplication } = props;
    useEffect(() => {
        getApplicationDetailForm(props.application_id, props.role_id);
        getApplication(props.application_id);
    }, [getApplicationDetailForm, getApplication])

    useEffect(() => {
        var tempActionMsgIDArray = [];
        var tempAllFormsCompleted = true;
        if (props.application_detail_form.forms !== undefined) {
            props.application_detail_form.forms.forEach((form, index) => {
                if (!props.application.application_closed) {
                    if (form.checkable) {
                        /*
                        tempSubmitableFormList.push({
                            id: form.id, title: form.title, form_completed: form.completed, is_submit: false,
                        });
                        */
                        if (!form.completed) {
                            tempAllFormsCompleted = false;
                        }
                    }
                }
            });
        }
        if (props.application_detail_form.actions !== undefined) {
            props.application_detail_form.actions.forEach((action, index) => {
                /*
              if (index === 0) {
                setActiveStep(tempSubmitableFormList.length);
                tempSubmitableFormList.push({
                  id: 0, title: 'Submit', form_completed: false, is_submit: true,
                });
              }
              */
                action.action_messages.forEach((actionMessage) => {
                    tempActionMsgIDArray.push({
                        id: actionMessage.id,
                        error: false,
                        to_email: actionMessage.next_task_email,
                        cc_email: actionMessage.cc_email,
                        subject: action.title,
                        body: actionMessage.message,
                        next_task_title: actionMessage.next_task_title_alias === '' ? actionMessage.next_task_title : actionMessage.next_task_title_alias,
                        next_task_sms: actionMessage.next_task_sms,
                        sms_message: actionMessage.sms_message,
                    });
                });
            });
            setTaskID(props.application_detail_form.id);
            setActions(props.application_detail_form.actions);
            setActionMsgIDs(tempActionMsgIDArray);
            setAllFormsCompleted(tempAllFormsCompleted);
        }
    }, [props]);

    const onActionMessageChange = (actionMessageID, e) => {
        var tempActionMsgIDs = actionMsgIDs;
        var objIndex = tempActionMsgIDs.findIndex(((obj) => obj.id === actionMessageID));
        tempActionMsgIDs[objIndex].body = e.target.value;
        tempActionMsgIDs[objIndex].error = false;
        if (e.target.value === '') {
            tempActionMsgIDs[objIndex].error = true;
        }
        setActionMsgIDs(tempActionMsgIDs);
        forceUpdate();
    };

    const onActionMessageSMSChange = (actionMessageID, e) => {
      var tempActionMsgIDs = actionMsgIDs;
      var objIndex = tempActionMsgIDs.findIndex(((obj) => obj.id === actionMessageID));
      tempActionMsgIDs[objIndex].sms_message = e.target.value;
      tempActionMsgIDs[objIndex].error = false;
      if (e.target.value === '') {
        tempActionMsgIDs[objIndex].error = true;
      }
      setActionMsgIDs(tempActionMsgIDs);
      forceUpdate();
    };
    const handleExpansionPanelChange = (panel) => (event, newExpanded) => {
        setCurrentExpansionPanel(newExpanded ? panel : false);
    };
    const handleConfirmAction = (e) => {
        if (!props.requesting) {
          var actionObj = actions.find((o) => o.id === e);
          var tempActionMsgIDArray = [];
          var actionMsgList = [];
          actionObj.action_messages.forEach((actionMessage) => {
            var actionMessageMessageID = `actionMessageMessage${actionMessage.id}`;
            var x = document.getElementById(actionMessageMessageID);
            if (x.value === '') {
              tempActionMsgIDArray.push(actionMessage.id);
            }
            var actionMessageSMSMessageID = `actionMessageSMSMessage${actionMessage.id}`;
            var y = document.getElementById(actionMessageSMSMessageID);
            if (actionMsgIDs.find((o) => o.id === actionMessage.id).next_task_sms !== '') {
              if (y.value === '') {
                tempActionMsgIDArray.push(actionMessage.id);
              }
            }
            actionMsgList.push({
              id: actionMessage.id,
              email: actionMessage.next_task_email,
              cc_email: actionMessage.cc_email,
              sms: actionMessage.next_task_sms,
              whatsup: actionMessage.next_task_whatsup,
              user_id: actionMessage.next_task_user_id,
              next_task_id: actionMessage.next_task_id,
              next_task_name: actionMessage.next_task_name,
              message: x.value,
              sms_message: y.value,
            });
          });
    
          var tempActionMsgIDs = actionMsgIDs;
          tempActionMsgIDArray.forEach((actionMessage) => {
            var objIndex = tempActionMsgIDs.findIndex(((obj) => obj.id === actionMessage));
            tempActionMsgIDs[objIndex].error = true;
          });
          setActionMsgIDs(tempActionMsgIDs);
          forceUpdate();
          if (tempActionMsgIDArray.length < 1) {
            props.postApplicationDetailAction(
              props.application_id,
              taskID, actionObj.id, { action_messages: actionMsgList },
            );
          }
        }
    };
    var checkList = [];
    if (props.application_detail_form.forms !== undefined) {
        props.application_detail_form.forms.forEach((form) => {
            if (form.checkable) {
                checkList.push(
                    <ListItem button key={form.id} onClick={(event) => handleListItemClick(event, form.id)}>
                        <ListItemIcon>
                            {form.completed
                                ? <DoneIcon color="primary" />
                                : <CloseIcon color="error" />}
                        </ListItemIcon>
                        <ListItemText primary={form.title} secondary={form.message} />
                    </ListItem>,
                );
            }
        });
    }
    var actionList = [];
    if (actions !== undefined) {
        actions.forEach((action) => {
            var actionMessageList = [];
            action.action_messages.forEach((actionMessage) => {
                actionMessageList.push(
                    <div style={{ display: (props.application_detail_form.show_hide_menu === 'initiate_hide') ? 'none' : 'block' }}>
                        <ExpansionPanelDetails key={`expansioneDetail${actionMessage.id}`}>

                            <Card style={{ width: '100%' }}>
                                <CardContent>
                                    <GridContainer style={{ width: '100%' }}>
                                        <GridItem key={`to${actionMessage.id}`} xs={12} sm={12} md={6}>
                                            <TextField
                                                disabled
                                                id={`actionMessageTo${actionMessage.id}`}
                                                label="To"
                                                variant="outlined"
                                                value={actionMsgIDs.find((o) => o.id === actionMessage.id).to_email}
                                                InputLabelProps={{ shrink: true }}
                                                style={{ width: '100%' }}
                                            />
                                        </GridItem>
                                        <GridItem key={`nextTask${actionMessage.id}`} xs={12} sm={12} md={6}>
                                            <TextField
                                                disabled
                                                id={`actionMessageNextTask${actionMessage.id}`}
                                                label="Next Task"
                                                variant="outlined"
                                                value={actionMsgIDs.find((o) => o.id === actionMessage.id).next_task_title}
                                                InputLabelProps={{ shrink: true }}
                                                style={{ width: '100%' }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <div style={{ display: (actionMsgIDs.find((o) => o.id === actionMessage.id).cc_email !== '') ? 'block' : 'none' }}>
                                        <GridContainer style={{ width: '100%' }}>
                                            <GridItem key={`ccemail${actionMessage.id}`} xs={12} sm={12} md={12}>
                                                <TextField
                                                    disabled
                                                    id={`actionMessageCCEmail${actionMessage.id}`}
                                                    label="CC Email"
                                                    variant="outlined"
                                                    value={actionMsgIDs.find((o) => o.id === actionMessage.id).cc_email}
                                                    InputLabelProps={{ shrink: true }}
                                                    style={{ width: '100%' }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <br />
                                    </div>
                                    <GridContainer style={{ width: '100%' }}>
                                        <GridItem key={`subject${actionMessage.id}`} xs={12} sm={12} md={12}>
                                            <TextField
                                                disabled
                                                id={`actionMessageSubject${actionMessage.id}`}
                                                label="Subject"
                                                variant="outlined"
                                                value={actionMsgIDs.find((o) => o.id === actionMessage.id).subject}
                                                InputLabelProps={{ shrink: true }}
                                                style={{ width: '100%' }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <GridContainer style={{ width: '100%' }}>
                                        <GridItem key={`message${actionMessage.id}`} xs={12} sm={12} md={12}>
                                            <TextField
                                                required
                                                id={`actionMessageMessage${actionMessage.id}`}
                                                label="Message"
                                                multiline
                                                rows="15"
                                                onChange={onActionMessageChange.bind(this, actionMessage.id)}
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                value={actionMsgIDs.find((o) => o.id === actionMessage.id).body}
                                                style={{ width: '100%' }}
                                                error={actionMsgIDs.find((o) => o.id === actionMessage.id).error}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <div style={{ display: (actionMsgIDs.find((o) => o.id === actionMessage.id).next_task_sms !== '') ? 'block' : 'none' }}>
                                        <GridContainer style={{ width: '100%' }}>
                                            <GridItem key={`sms${actionMessage.id}`} xs={12} sm={12} md={12}>
                                                <TextField
                                                    disabled
                                                    id={`actionMessageSMS${actionMessage.id}`}
                                                    label="SMS To:"
                                                    variant="outlined"
                                                    value={actionMsgIDs.find((o) => o.id === actionMessage.id).next_task_sms}
                                                    InputLabelProps={{ shrink: true }}
                                                    style={{ width: '100%' }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <br />
                                        <GridContainer style={{ width: '100%' }}>
                                            <GridItem key={`smsMessage${actionMessage.id}`} xs={12} sm={12} md={12}>
                                                <TextField
                                                    id={`actionMessageSMSMessage${actionMessage.id}`}
                                                    label="SMS Message:"
                                                    variant="outlined"
                                                    multiline
                                                    rows="2"
                                                    onChange={onActionMessageSMSChange.bind(this, actionMessage.id)}
                                                    value={actionMsgIDs.find((o) => o.id === actionMessage.id).sms_message}
                                                    InputLabelProps={{ shrink: true }}
                                                    style={{ width: '100%' }}
                                                    error={actionMsgIDs.find((o) => o.id === actionMessage.id).error}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <br />
                                    </div>
                                </CardContent>
                            </Card>
                        </ExpansionPanelDetails>
                    </div>,
                );
            });

            actionList.push(
                <div key={action.id} style={{ display: (props.application_detail_form.show_hide_menu === 'initiate_hide') ? 'none' : 'block' }}>
                    <ExpansionPanel
                        style={{
                            border: '1px solid rgba(0, 0, 0, .125)', boxShadow: 'none',
                        }}
                        key={action.id}
                        expanded={currentExpansionPanel === action.id}
                        onChange={handleExpansionPanelChange(action.id)}
                    >
                        <ExpansionPanelSummary key={`sum${action.id}`} style={{ backgroundColor: 'rgba(0, 0, 0, .05)' }} expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content">
                            <div>
                                <Typography style={{ display: 'inline-block', marginRight: 16 }}>{action.title}</Typography>
                                <Typography style={{ display: 'inline-block', color: 'orange' }} variant="caption">{action.require_complete_task ? 'Require all forms to be completed' : ''}</Typography>
                                <Typography variant="caption" display="block">{action.type_desc}</Typography>
                            </div>
                        </ExpansionPanelSummary>
                        {actionMessageList}
                        <ExpansionPanelActions>
                            <Button
                                onClick={handleConfirmAction.bind(this, action.id)}
                                color="primary"
                                round
                                disabled={action.require_complete_task ? !allFormsCompleted : false}
                            >
                                {props.requesting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                &nbsp;&nbsp;
                                Confirm Action
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>,
            );
            if (props.application_detail_form.show_hide_menu === 'initiate_hide') {
                actionList.push(
                    <div key={action.id + 100}>
                        <Button
                            onClick={handleConfirmAction.bind(this, action.id)}
                            color="primary"
                            round
                            disabled={action.require_complete_task ? !allFormsCompleted : false}
                        >
                            {props.requesting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                            &nbsp;&nbsp;
                            Submit
                        </Button>
                    </div>,
                );
            }
        });
    }

    return (
        <div>
            <Card>
                <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
                    <Typography variant="h5" gutterBottom>Submit Checklist</Typography>
                </div>
                <CardContent>
                    <List component="nav" aria-label="main mailbox folders">
                        {checkList}
                    </List>
                </CardContent>
            </Card>
            <br />
            {props.application_detail_form.action_required === undefined ? '' : props.application_detail_form.action_required
                ? (
                    <Card>
                        <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
                            <Typography variant="h5" gutterBottom>Submit Action</Typography>
                        </div>
                        <CardContent>
                            {actionList}
                        </CardContent>
                    </Card>
                )
                : ''}
        </div>
    );
};
export default Action;
