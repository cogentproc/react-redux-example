import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ActiveTaskComp = (props) => {
  const { getApplicationStatus, application_id, role_id } = props;
  useEffect(() => {
    getApplicationStatus(application_id, role_id);
  }, [getApplicationStatus, application_id, role_id]);

  const rowItems = [];
  var i = 1;
  props.application_status_list.forEach((element) => {
    var status = '';
    if (!element.completed) {
      status = 'Pending';
    }
    if (parseInt(element.role_id, 10) === parseInt(props.role_id, 10)) {
      status = 'Current User';
    }
    rowItems.push(
      <TableRow key={element.id}>
        <TableCell>
          {i}
        </TableCell>
        <TableCell>
          {element.user_name}
          ,
          <br />
          {element.user_email}
          {element.user_rank !== '' ? ',' : ''}
          <br />
          {element.user_rank}
          {element.user_dept_name !== '' ? ',' : ''}
          <br />
          {element.user_dept_name}
          <br />
        </TableCell>
        <TableCell>
          {element.role_alias === '' ? element.role_title : element.role_alias}
        </TableCell>
        <TableCell>{element.task_alias === '' ? element.task_title : element.task_alias}</TableCell>
        <TableCell>{element.app_title}</TableCell>
        <TableCell>
          <div style={{ color: status === 'Pending' ? 'red' : 'blue' }}>{status}</div>
          <br />
          Reminders:
          {' '}
          {element.reminders}
        </TableCell>
      </TableRow>,
    );
    i++;
  });
  return (
    <div>
      <Card>
        <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom>Active Task</Typography>
        </div>
        <CardContent>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Serial</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Application</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowItems}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveTaskComp;
