import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import MUIDataTable from 'mui-datatables';

const AppTrackComp = (props) => {
  const [data, setData] = useState([]);

  const { getApplicationLog, application_id } = props;
  useEffect(() => {
    getApplicationLog(application_id);
  }, [getApplicationLog, application_id]);

  useEffect(() => {
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

  return (
    <div>
      <Card>
        <div color="primary" style={{ textAlign: 'left', paddingTop: '30px',paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom>Application Tracking</Typography>
        </div>
        <CardContent>
          <MUIDataTable
            data={data}
            columns={columns}
            options={options}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AppTrackComp;
