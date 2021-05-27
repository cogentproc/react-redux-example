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

export default function ErrorSnackbars(props) {
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
  const setFormErrorMsgLcl = useCallback(
    (event) => {
      props.setFormErrorMsg(false);
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
        onClose={() => setFormErrorMsgLcl()}
      >
        <Alert onClose={() => setFormErrorMsgLcl()} severity="error">
          Data Not Saved! Please Try Again.
        </Alert>
      </Snackbar>
    </div>
  );
}
