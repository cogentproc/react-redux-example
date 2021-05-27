import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const AppRoleComp = (props) => {
  const { getApplicationRoles, application_id, role_id } = props;
  useEffect(() => {
    getApplicationRoles(application_id, role_id);
  }, [getApplicationRoles, application_id, role_id]);

  useEffect(() => {
    if (props.refreshApplicationDetailForm) {
      props.getApplicationRoles(props.application_id, props.role_id);
    }
  }, [props]);

  const rowItems = [];
  var i = 1;
  props.application_roles.forEach((element) => {
    rowItems.push(
      <TableRow key={element.id}>
        <TableCell>{i}</TableCell>
        <TableCell>
          {element.user_name}
          {element.user_rank !== '' ? ',' : ''}
          <br />
          {element.user_rank}
          {element.user_dept !== '' ? ',' : ''}
          <br />
          {element.user_dept}
          <br />
        </TableCell>
        <TableCell>
          {element.role_alias === '' ? element.role_title : element.role_alias}
        </TableCell>
      </TableRow>,
    );
    i++;
  });
  return (
    <div>
      <Card>
        <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom>Roles</Typography>
        </div>
        <CardContent>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Serial</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
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
export default AppRoleComp;
