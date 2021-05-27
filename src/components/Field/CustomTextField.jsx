import React, { useState, useEffect, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';

const CustomTextField = (props) => {
  const [fields, setFields] = useState([])
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    setFields(props.fields)
  }, [props]);

  const onfieldValueChange = (fieldID, e) => {
    var tempFields = fields;
    var foundIndex = tempFields.findIndex((x) => x.id === fieldID);
    tempFields[foundIndex].value = e.target.value;
    tempFields[foundIndex].error = false;
    if (tempFields[foundIndex].required && e.target.value === '') {
      tempFields[foundIndex].error = true;
    }
    setFields(tempFields);
    forceUpdate();
  };
  return (
    <TextField
      required={props.field.required === 'true'}
      error={props.field.error}
      value={props.field.value}
      type={props.field.type === 'DATE' ? "date" : ""}
      key={props.field.id}
      id={`${props.field.id}`}
      fullWidth
      label={props.field.label}
      onChange={onfieldValueChange.bind(this, props.field.id)}
      // disabled={isDisabled}
      //InputProps={{ readOnly: isDisabled }}
      helperText={props.field.field_error_message}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};
export default CustomTextField;