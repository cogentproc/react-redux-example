import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import MessageIcon from '@material-ui/icons/Message';
import TimelineIcon from '@material-ui/icons/Timeline';
import RowingIcon from '@material-ui/icons/Rowing';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { useHistory } from 'react-router-dom';

const RightSide = (props) => {
    const [displayActionForm, setDisplayActionForm] = useState(false);
    const [displayActionMessages, setDisplayActionMessages] = useState(true);
    const [displayAppActiveTask, setDisplayAppActiveTask] = useState(false);
    const [displayAppTracking, setDisplayAppTracking] = useState(false);
    const [displayAppRoles, setDisplayAppRoles] = useState(false);
    const [displayAppHelp, setDisplayAppHelp] = useState(false);
    const history = useHistory();

    const handleActionClick = () => {
        history.push(`/detail/action/` + props.application.id + '/' + props.application_detail.role_id );
        setDisplayActionForm(true);
        setDisplayActionMessages(false);
        setDisplayAppActiveTask(false);
        setDisplayAppTracking(false);
        setDisplayAppRoles(false);
        setDisplayAppHelp(false);
    };
    const handleActionMessagesClick = () => {
        history.push(`/detail/message/` + props.application.id + '/' + props.application_detail.role_id );
        setDisplayActionForm(false);
        setDisplayActionMessages(true);
        setDisplayAppActiveTask(false);
        setDisplayAppTracking(false);
        setDisplayAppRoles(false);
        setDisplayAppHelp(false);
    };
    const handleAppActiveTaskClick = () => {
        history.push(`/detail/active-task/` + props.application.id + '/' + props.application_detail.role_id );
        setDisplayActionForm(false);
        setDisplayActionMessages(false);
        setDisplayAppActiveTask(true);
        setDisplayAppTracking(false);
        setDisplayAppRoles(false);
        setDisplayAppHelp(false);
    };
    const handleAppTrackingClick = () => {
        history.push(`/detail/track/` + props.application.id + '/' + props.application_detail.role_id );
        setDisplayActionForm(false);
        setDisplayActionMessages(false);
        setDisplayAppActiveTask(false);
        setDisplayAppTracking(true);
        setDisplayAppRoles(false);
        setDisplayAppHelp(false);
    };
    const handleAppRolesClick = () => {
        history.push(`/detail/role/` + props.application.id + '/' + props.application_detail.role_id );
        setDisplayActionForm(false);
        setDisplayActionMessages(false);
        setDisplayAppActiveTask(false);
        setDisplayAppTracking(false);
        setDisplayAppRoles(true);
        setDisplayAppHelp(false);
    };
    const handleAppHelpClick = () => {
        history.push(`/detail/help/` + props.application.id + '/' + props.application_detail.role_id );
        setDisplayActionForm(false);
        setDisplayActionMessages(false);
        setDisplayAppActiveTask(false);
        setDisplayAppTracking(false);
        setDisplayAppRoles(false);
        setDisplayAppHelp(true);
    };
    return (
        <div>
            <List>
                <ListItem button onClick={handleActionClick} selected={displayActionForm}>
                    <ListItemIcon style={{ display: props.application.application_closed ? 'none' : 'block' }}>
                        <SyncAltIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText style={{ display: props.application.application_closed ? 'none' : 'block' }} primary="Submit" />
                </ListItem>
                <ListItem button onClick={handleActionMessagesClick} selected={displayActionMessages} >
                    <ListItemIcon>
                        <MessageIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Messages" />
                </ListItem>
                <ListItem button onClick={handleAppTrackingClick} selected={displayAppTracking}>
                    <ListItemIcon>
                        <TimelineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography type="caption">Tracking</Typography>}
                    />
                </ListItem>
                <ListItem button onClick={handleAppRolesClick} selected={displayAppRoles}>
                    <ListItemIcon>
                        <PeopleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography type="caption">Roles</Typography>}
                    />
                </ListItem>
                <ListItem button onClick={handleAppActiveTaskClick} selected={displayAppActiveTask}>
                    <ListItemIcon>
                        <RowingIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Active Tasks" />
                </ListItem>
                <ListItem button onClick={handleAppHelpClick} selected={displayAppHelp}>
                    <ListItemIcon>
                        <HelpIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography type="caption">Help</Typography>}
                    />
                </ListItem>
            </List>
        </div>
    );
};
export default RightSide