/* eslint-disable react/jsx-props-no-spreading */
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useCallback } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SuccessSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(props);
  const [state] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  useEffect(() => {
    setOpen(props.open);
  }, [props]);
  /**/
  const setFormSuccessMsgLcl = useCallback(
    (event) => {
      props.setFormSuccessMsg(false);
    },
    [props],
  );
  /**/
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setFormSuccessMsgLcl()}
      >
        <Alert onClose={() => setFormSuccessMsgLcl()} severity="success">
          Data Saved!
        </Alert>
      </Snackbar>
    </div>
  );
}
