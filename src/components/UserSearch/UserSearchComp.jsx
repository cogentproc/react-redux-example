import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const UserSearchComp = (props) => {
  const [userMUIData, setUserMUIData] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [searchUserStr, setSearchUserStr] = useState('');

  useEffect(() => {
    setMessage(props.message);
    var userRowItems = [];
    if (props.search_user_list.length > 0) {
      for (let i = 0; i < props.search_user_list.length; i++) {
        var colItems = [];
        colItems.push(`${props.search_user_list[i].name} ${props.search_user_list[i].email}`);
        colItems.push(props.search_user_list[i].dept_name);
        userRowItems.push(colItems);
      }
    }
    setUserMUIData(userRowItems);
    setUserType(props.user_type);
    setSearchUserList(props.search_user_list);
  }, [props]);

  const handleSearchUserClick = (e) => {
    if (searchUserStr !== '') {
      props.SearchUser(searchUserStr);
    }
    e.preventDefault();
  };

  const onSearchUserStrChange = (e) => {
    // props.setSelectedUser("", "")
    setSearchUserStr(e.target.value);
    if (e.target.value.length > 1) {
      props.SearchUser(userType, e.target.value);
    }
  };
  const userMUIDataColumns = [
    'Name',
    'Department',
  ];
  const userMUIDataOptions = {
    selectableRowsHideCheckboxes: true,
    filterType: 'dropdown',
    responsive: 'standard',
    // standard | vertical | simple
    selectableRows: 'single',
    selectableRowsOnClick: true,
    selectToolbarPlacement: 'none',
    pagination: true,
    print: false,
    filter: false,
    download: false,
    search: false,
    sortFilterList: false,
    viewColumns: false,
    rowsSelected: [],
    onRowSelectionChange: (rowsSelected, allRows) => {
      props.setSelectedUser(
        `${searchUserList[rowsSelected[0].index].name} (${
          searchUserList[rowsSelected[0].index].email} ${
          searchUserList[rowsSelected[0].index].dept_name})`,
        searchUserList[rowsSelected[0].index].id,
      );
    },
  };
  return (
    <div>
      {props.requesting && <CircularProgress size={44} style={{ position: 'absolute', top: '50%', left: '50%' }} />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <TextField
            required={false}
            fullWidth
            label="Search User"
            value={searchUserStr}
            onChange={onSearchUserStrChange.bind(this)}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Button
            onClick={handleSearchUserClick.bind(this)}
            color="primary"
            round
            variant="contained"
          >
            <SearchIcon />
&nbsp;&nbsp; Search
          </Button>
        </GridItem>
      </GridContainer>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div style={{ display: userMUIData.length < 1 ? 'none' : 'block' }}>
            <div style={{ color: 'red', textAlign: 'center' }}>{message}</div>
            <MUIDataTable
              data={userMUIData}
              columns={userMUIDataColumns}
              options={userMUIDataOptions}
            />
          </div>
          <div style={{ display: userMUIData.length > 0 ? 'none' : 'block' }}>
            No Record found
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};
export default UserSearchComp;
