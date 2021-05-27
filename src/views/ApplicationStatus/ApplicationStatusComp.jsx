import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import MUIDataTable from 'mui-datatables';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

const ApplicationStatusComp = (props) => {
  const [data, setData] = useState([]);
  const [applicationStatusList, setApplicationStatusList] = useState([]);

  const {
    getApplicationStatus, getApplicationLog, getApplication, getRole, application_id, role_id,
  } = props;
  useEffect(() => {
    getApplicationStatus(application_id, role_id);
    getApplicationLog(application_id);
    getApplication(application_id);
    getRole(role_id);
  }, [getApplicationStatus, getApplicationLog, getApplication, getRole, application_id, role_id]);

  useEffect(() => {
    setApplicationStatusList(props.application_status_list);

    var rowItems = [];
    for (let i = 0; i < props.application_log.length; i++) {
      var colItems = [];
      var date = new Date(props.application_log[i].action_time);
      colItems.push(i + 1);
      colItems.push(props.application_log[i].task_alias === '' ? props.application_log[i].task_title : props.application_log[i].task_alias);
      colItems.push(`${props.application_log[i].actor} (${props.application_log[i].role_alias === '' ? props.application_log[i].role_title : props.application_log[i].role_alias})`);
      colItems.push(props.application_log[i].action_title);
      colItems.push(`${date.toDateString()} ${date.toLocaleTimeString()}`);
      rowItems.push(colItems);
    }
    setData(rowItems);
    props.setCurrentRoleTitle((props.role.alias === '' ? props.role.title : props.role.alias));
  }, [props]);

  const columns = [
    'Serial',
    'Task',
    'Person',
    'Action',
    'Action Time',
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    filter: true,
    selectableRows: 'none',
    rowsPerPage: 100,
    selectToolbarPlacement: 'none',
  };
  const rowItems = [];
  var i = 1;
  applicationStatusList.forEach((element) => {
    var status = '';
    if (!element.completed) {
      status = 'Pending';
    }
    if (parseInt(element.role_id, 10) === parseInt(props.role_id, 10)) {
      status = <Link to={`/detail/${props.application_id}/${props.role_id}`}> Current User </Link>;
    }
    rowItems.push(
      <TableRow key={element.id}>
        <TableCell>{i}</TableCell>
        <TableCell>
          {element.user_name === 'hidden' ? '-' : element.user_name}
          ,
          <br />
          {element.user_email === 'hidden' ? '-' : element.user_email}
          {element.user_rank !== '' ? ',' : ''}
          <br />
          {element.user_rank === 'hidden' ? '-' : element.user_rank}
          {element.user_dept_name !== '' ? ',' : ''}
          <br />
          {element.user_dept_name === 'hidden' ? '-' : element.user_dept_name}
        </TableCell>
        <TableCell>{element.role_alias === '' ? element.role_title : element.role_alias}</TableCell>
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
      {/* MainPage */}
      <div style={{ border: '0px solid', width: '100%', height: '100%' }} id="1">
        <Card>
          <div color="primary">
            <h2>
              Active Task of
              {localStorage.getItem('application_label') !== '' ? localStorage.getItem('application_label') : ' Application'}
            </h2>
          </div>
          <CardContent>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Serial</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Task Name</TableCell>
                  <TableCell>{localStorage.getItem('application_label') !== '' ? localStorage.getItem('application_label') : 'Application'}</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowItems}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <br />
        <Card>
          <CardContent>
            <MUIDataTable
              title={localStorage.getItem('application_label') !== '' ? localStorage.getItem('application_label') : 'Application ' +" Tracking"}
              data={data}
              columns={columns}
              options={options}
            />
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default ApplicationStatusComp;
