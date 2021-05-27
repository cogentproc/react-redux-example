import React, { useState, useEffect, useReducer } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
const CustomRadio = (props) => {
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
    var radioButtonUI = [];
    var optionListField = '';
    var isDisabled = false
    if (props.form.fields !== undefined) {
        optionListField = props.form.fields.filter(field => field.id === props.field.id)[0]
        var radioButtonOptionJSON = JSON.parse(optionListField.options);
        if (props.field.is_read_only || !props.form.checkable) {
            isDisabled = true;
        }
        radioButtonOptionJSON.forEach((radioButton, index) => {
            radioButtonUI.push(
                <FormControlLabel
                    key={`radioButton${index}${props.field.id}`}
                    control={(
                        <Radio
                            id={`radioButton${index}${props.field.id}`}
                            color="primary"
                        />
                    )}
                    label={radioButton.value}
                    value={radioButton.id}
                />,
            );
        });
    }
    return (
        <FormControl
            required={props.field.required === 'true'}
            error={props.field.error}
            key={props.field.id}
            id={`${props.field.id}`}
            disabled={isDisabled}
            component="fieldset"
        >
            <FormLabel>{props.field.label}</FormLabel>
            <RadioGroup
                aria-label="radio"
                name="radio"
                value={props.field.value}
                key={`radioGroup${props.field.id}`}
                onChange={isDisabled ? '' : onfieldValueChange.bind(this, props.field.id)}
            >
                {radioButtonUI}
            </RadioGroup>
            <FormHelperText>{props.field.field_error_message}</FormHelperText>
        </FormControl>
    );
};
export default CustomRadio;