import React, { useState, useEffect, useReducer } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const CustomSelect = (props) => {
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
  var dropdownUI = [];
  var isDisabled = false;
  var selectListField = '';
  if (props.form.fields !== undefined) {
    selectListField = props.form.fields.filter(field => field.id === props.field.id)[0]
    if (selectListField.is_read_only || !props.form.checkable) {
      isDisabled = true;
    }
    var dropdownOptionJSON = JSON.parse(selectListField.options);
    dropdownOptionJSON.forEach((dropdown) => {
      dropdownUI.push(
        <MenuItem key={dropdown.id} id={dropdown.id} value={dropdown.id}>{dropdown.value}</MenuItem>,
      );
    });
    
  }
  return (
    <FormControl
      required={props.field.required === 'true'}
      error={props.field.error}
      key={props.field.id}
      id={`${props.field.id}`}
      fullWidth
    >
      <InputLabel id={`label${props.field.id}`}>{props.field.label}</InputLabel>
      <Select
        labelId={`label${props.field.id}`}
        id={`${props.field.id}`}
        value={props.field.value}
        onChange={isDisabled ? '' : onfieldValueChange.bind(this, props.field.id)}
        autoWidth
      >
        {dropdownUI}
      </Select>
      <FormHelperText>{props.field.field_error_message}</FormHelperText>
    </FormControl>
  );
};
export default CustomSelect;