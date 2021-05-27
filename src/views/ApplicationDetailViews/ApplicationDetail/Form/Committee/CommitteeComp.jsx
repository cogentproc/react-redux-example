import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import Typography from '@material-ui/core/Typography';
import UserSearch from 'components/UserSearch/UserSearch.jsx';

const CommitteeComp = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { getAdhocRoles } = props;

  useEffect(() => {
    getAdhocRoles();
  }, [getAdhocRoles]);

  useEffect(() => {
    if (props.selected_user_id > 0) {
      setDialogOpen(false);
    }
    for (let i = 0; i < props.role_list.length; i++) {
      if (props.field_committee_id === props.role_list[i].committee_name_id) {
        var userData = '';
        var userID = 0;
        var filteredFieldValue = props.field_value.filter((o) => o.role_id === props.role_list[i].id);
        if (filteredFieldValue.length > 0) {
          userData = filteredFieldValue[0].data;
          userID = filteredFieldValue[0].user_id;
        }
        var objIndex = props.role_user.findIndex((o) => o.role_id === props.role_list[i].id);
        if (objIndex === -1) {
          props.role_user.push({
            role_id: props.role_list[i].id,
            data: userData,
            user_id: userID,
            email: '',
            message: '',
          });
        }
      }
    }
  }, [props]);

  const handleDialogClose = (e) => {
    setDialogOpen(false);
    setMessage('');
  };

  const handleRoleItemClick = (event, roleID) => {
    var objIndex = props.role_user.findIndex((o) => o.role_id === roleID && o.user_id === 0);
    if (objIndex > -1) {
      setDialogOpen(true);
    }
    props.setSelectedRoleID(roleID);
  };
  const roleItems = [];
  props.role_list.forEach((obj) => {
    if (props.field_committee_id === obj.committee_name_id) {
      var userData = 'No User Selected';
      var userID = 0;
      var roleUser = props.role_user.filter((o) => o.role_id === obj.id && o.user_id !== 0);
      if (roleUser.length > 0) {
        userData = roleUser[0].data;
        userID = roleUser[0].user_id;
      }

      roleItems.push(
        <List key={obj.id}>
          <ListItem>
            <ListItemText
              primary={obj.alias === '' ? obj.title : obj.alias}
              secondary={userData}
            />
            {props.form_checkable
              ? (
                <Button
                  color="primary"
                  round
                  variant="contained"
                  onClick={(event) => handleRoleItemClick(event, obj.id)}
                >
                  <AccessibilityIcon color={userID === 0 ? 'inherit' : 'disabled'} />
                  {' '}
                  {userID === 0 ? 'Select User' : 'Unselect User'}
                </Button>
              )
              : ''}
          </ListItem>
        </List>,
      );
    }
  });

  return (
    <div>
      <div>{props.field_label}</div>
      <div style={{ color: 'red', textAlign: 'center' }}>{props.message}</div>
      {roleItems}
      <Dialog fullWidth open={dialogOpen} onClose={handleDialogClose.bind(this)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Card>
            <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
            <Typography variant="h5" gutterBottom>Search User</Typography>
            </div>
            <CardContent>
              <div style={{ color: 'red', textAlign: 'center' }}>{message}</div>
              <UserSearch />
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose.bind(this)} color="primary" round>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CommitteeComp;
