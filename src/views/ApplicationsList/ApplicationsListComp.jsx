/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';

const ApplicationListComp = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogButton, setDialogButton] = useState('');
  const [data, setData] = useState([]);
  const [dataArchive, setDataArchive] = useState([]);
  const [applicationName, setApplicationName] = useState('');
  const [message, setMessage] = useState('');
  const [helpDescription, setHelpDescription] = useState([]);

  const active_columns = [
    {
      name: 'serial',
      label: 'Serial',
      display: true,
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div>
            {tableMeta.rowData[5] === 'INACCESSIBLE'
              ? <Link to={`status/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'red' }}>{value}</div></Link>
              : <Link to={`detail/message/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'green' }}>{value}</div></Link>}
          </div>
        ),

      },
    },
    {
      name: 'application_id',
      label: 'ID',

      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'name_string',
      label: 'Name of Initiator',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div>
            {tableMeta.rowData[5] === 'INACCESSIBLE'
              ? <Link to={`status/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'red' }}>{value}</div></Link>
              : <Link to={`detail/message/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'green' }}>{value}</div></Link>}
          </div>
        ),
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div>
            {tableMeta.rowData[5] === 'INACCESSIBLE'
              ? <Link to={`status/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'red' }}>{value}</div></Link>
              : <Link to={`detail/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'green' }}>{value}</div></Link>}
          </div>
        ),
      },
    },
    {
      name: 'start_date',
      label: 'Start Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div>
            {tableMeta.rowData[5] === 'INACCESSIBLE'
              ? <Link to={`status/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'red' }}>{value}</div></Link>
              : <Link to={`detail/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'green' }}>{value}</div></Link>}
          </div>
        ),
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div>
            {tableMeta.rowData[5] === 'INACCESSIBLE'
              ? <Link to={`status/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'red' }}>{value}</div></Link>
              : <Link to={`detail/${tableMeta.rowData[1]}/${tableMeta.rowData[6]}`}><div style={{ color: 'green' }}>{value}</div></Link>}
          </div>
        ),
      },
    },
    {
      name: 'role_id',
      label: 'Role ID',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
  ];

  const {
    resetApplicationDetail, getActiveApplications, getArchiveApplications, isAllowedToCreateApplication, getWorkflowByUser,
  } = props;
  useEffect(() => {
    resetApplicationDetail();
    getActiveApplications();
    getArchiveApplications();
    isAllowedToCreateApplication();
    getWorkflowByUser();
  }, [resetApplicationDetail, getActiveApplications, getArchiveApplications, isAllowedToCreateApplication, getWorkflowByUser]);

  useEffect(() => {
    setMessage(props.message);
    if (props.refreshApplication) {
      setDialogOpen(false);
      props.getActiveApplications();
    }
    var rowItems = [];
    for (let i = 0; i < props.active_application_list.length; i++) {
      if (props.active_application_list[i].title !== '') {
        var colItems = [];
        var date = new Date(props.active_application_list[i].start_date);
        colItems.push(i + 1);
        colItems.push(props.active_application_list[i].application_id);
        colItems.push(props.active_application_list[i].name_string);
        colItems.push(props.active_application_list[i].title);
        colItems.push(date.toDateString());
        colItems.push(props.active_application_list[i].status);
        colItems.push(props.active_application_list[i].role_id);
        rowItems.push(colItems);
      }
    }
    var rowItemsArchive = [];
    for (let i = 0; i < props.archive_application_list.length; i++) {
      if (props.archive_application_list[i].title !== '') {
        var colItemsAr = [];
        date = new Date(props.archive_application_list[i].start_date);
        colItemsAr.push(i + 1);
        colItemsAr.push(props.archive_application_list[i].application_id);
        colItemsAr.push(props.archive_application_list[i].name_string);
        colItemsAr.push(props.archive_application_list[i].title);
        colItemsAr.push(date.toDateString());
        colItemsAr.push(props.archive_application_list[i].status);
        colItemsAr.push(props.archive_application_list[i].role_id);
        rowItemsArchive.push(colItemsAr);
      }
    }
    setData(rowItems);
    setDataArchive(rowItemsArchive);
    setHelpDescription(props.workflow.description);
  }, [props]);

  const handleNewClick = (e) => {
    setApplicationName('');
    setMessage('');
    setDialogButton(localStorage.getItem('application_label') !== '' ? `Create ${localStorage.getItem('application_label')}` : 'Create Application');
    setDialogOpen(true);
  };

  const onApplicationNameChange = (e) => {
    setApplicationName(e.target.value);
  };

  const handleDialogClose = (e) => {
    setDialogOpen(false);
    setMessage('');
  };
  const handleDialogConfirm = (e) => {
    if (!props.requesting) {
      props.createApplication({ title: applicationName });
      setDialogOpen(false);
    }
  };
  const columns = active_columns;
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

      {props.requesting && <CircularProgress size={44} style={{ position: 'absolute', top: '50%', left: '50%' }} />}

      <div style={{ paddingTop: '10px' }}>
        <div style={{ textAlign: 'right', display: props.isAllowed ? 'block' : 'none' }}>
          <Button
            color="primary"
            variant="contained"
            round
            onClick={handleNewClick.bind(this)}
            startIcon={<AddIcon />}
            disabled={props.requesting}
          >
            create new
            {' '}
            {localStorage.getItem('application_label') !== '' ? localStorage.getItem('application_label') : 'Application'}
          </Button>
        </div>
        <br />
        {props.requesting && <CircularProgress size={44} style={{ position: 'absolute', top: '50%', left: '50%' }} />}
        <div style={{ color: 'red', textAlign: 'center' }}>{message}</div> <br />
        <Card>
          <CardContent>
            <MUIDataTable
              title={"Active Items"}
              data={data}
              columns={columns}
              options={options}
            />
          </CardContent>
        </Card>
        <br />
        <Card>
          <CardContent>
            <MUIDataTable
              title={"Archived Items"}
              data={dataArchive}
              columns={columns}
              options={options}
            />
          </CardContent>
        </Card>
        <br />
        <Card>
          <CardContent>
            <div color="primary" style={{ textAlign: 'left', paddingTop: '30px' }}>
              <h2>Help</h2>
            </div>
            <br />
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: helpDescription }}
            />
          </CardContent>
        </Card>
        <Dialog fullWidth open={dialogOpen} onClose={handleDialogClose.bind(this)} aria-labelledby="form-dialog-title">
          <DialogContent>
            <Card>
              <div color="primary" style={{ textAlign: 'left', paddingTop: '30px' }}>
                <b>
                  Create New
                  {localStorage.getItem('application_label') !== '' ? localStorage.getItem('application_label') : 'Application'}
                </b>
                <br />
              </div>
              <CardContent>
                <div style={{ color: 'red', textAlign: 'center' }}>{message}</div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      required
                      fullWidth
                      label={localStorage.getItem('application_label') !== '' ? `${localStorage.getItem('application_label')} Name` : 'Application Name'}
                      value={applicationName}
                      onChange={onApplicationNameChange.bind(this)}
                    />
                  </GridItem>
                </GridContainer>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleDialogClose.bind(this)} color="primary" round>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDialogConfirm.bind(this)} color="primary" round>
              {props.requesting
                ? <CircularProgress size={20} color="inherit" />
                : <SaveIcon />}
              {dialogButton}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ApplicationListComp;
