import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const AppHelpComp = (props) => {
  const [helpDescription, setHelpDescription] = useState([]);

  const { getWorkflowByUser } = props;
  useEffect(() => {
    getWorkflowByUser();
  }, [getWorkflowByUser]);

  useEffect(() => {
    setHelpDescription(props.workflow.description);
  }, [props]);

  return (
    <div>
      <Card>
        <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
          <Typography variant="h5" gutterBottom>Help</Typography>
        </div>
        <CardContent>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: helpDescription }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AppHelpComp;
