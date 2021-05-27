import React, { useState, useEffect, useReducer } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = (props) => {
  const [fields, setFields] = useState([])
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    setFields(props.fields)
  }, [props]);

  const onCheckboxChange = (fieldID, e) => {
    var tempFields = fields;
    var foundIndex = tempFields.findIndex((x) => x.id === fieldID);
    var valueArray = tempFields[foundIndex].valueArray;
    var foundValueIndex = valueArray.findIndex((x) => x === e.target.value);
    if (foundValueIndex === -1 && e.target.checked) {
      valueArray.push(e.target.value);
    }
    if (foundValueIndex !== -1 && !e.target.checked) {
      valueArray = valueArray.filter((item) => item !== e.target.value);
    }
    tempFields[foundIndex].error = false;
    tempFields[foundIndex].valueArray = valueArray;
    if (valueArray.length < 1 && tempFields[foundIndex].required) {
      tempFields[foundIndex].error = true;
    }
    setFields(tempFields);
    forceUpdate();
  };
  var checkboxUI = [];
  var isDisabled = false;
  var optionListField = '';
  if (props.form.fields !== undefined) {
    optionListField = props.form.fields.filter(field => field.id === props.field.id)[0]
    var checkboxOptionJSON = JSON.parse(optionListField.options)
    if (props.field.is_read_only || !props.form.checkable) {
      isDisabled = true;
    }
    checkboxOptionJSON.forEach((checkbox, index) => {
      var valueArray = props.field.valueArray;
      checkboxUI.push(
        <FormControlLabel
          key={index + checkbox.id}
          control={(
            <Checkbox
              id={`${index}${props.field.id}`}
              key={`${index}${props.field.id}`}
              color="primary"
              checked={valueArray.find((q) => q === checkbox.id)}
              value={checkbox.id}
              onChange={isDisabled ? '' : onCheckboxChange.bind(this, props.field.id)}
            />
          )}
          label={checkbox.value}
          value={checkbox.id}
        />,
      );
    });
  }

  return (
    <div>
      <FormControl
        required={props.field.required === 'true'}
        error={props.field.error}
        key={props.field.id}
        id={`${props.field.id}`}
        disabled={isDisabled}
        component="fieldset"
      >
        <FormLabel>{props.field.label}</FormLabel>
        <FormGroup key={props.field.id}>
          {checkboxUI}
        </FormGroup>
        <FormHelperText>{props.field.field_error_message}</FormHelperText>
      </FormControl>
    </div >
  );

};
export default CustomCheckbox;