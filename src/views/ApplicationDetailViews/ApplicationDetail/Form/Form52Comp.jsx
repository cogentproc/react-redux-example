import Committee from './Committee'
import React, { useState, useEffect, useReducer } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomTextField from 'components/Field/CustomTextField';
import CustomRadio from 'components/Field/CustomRadio';
import CustomSelect from 'components/Field/CustomSelect';
import Grid from '@material-ui/core/Grid';
import FormSave from './FormSave';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

const Form52Comp = (props) => {

    const [fields, setFields] = useState([])
    const [taskID, setTaskID] = useState(0)
    const [roleID, setRoleID] = useState(0)
    const [submitableFormList, setSubmitableFormList] = useState([]);
    const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)
    useEffect(() => {
        var tempFields = [];
        var tempSubmitableFormList = [];
        var tempAllFormsCompleted = true;
        if (props.application_detail_form.forms !== undefined) {
            props.application_detail_form.forms.forEach((form, index) => {
                if (!props.application.application_closed) {
                    if (form.checkable) {
                        tempSubmitableFormList.push({
                            id: form.id, title: form.title, form_completed: form.completed, is_submit: false,
                        });
                        if (!form.completed) {
                            tempAllFormsCompleted = false;
                        }
                    }
                }
            });
            setSubmitableFormList(tempSubmitableFormList);
        }
        if (props.form.fields !== undefined) {
            props.form.fields.forEach((field) => {
                var isError = false;
                var value = '';
                var fieldValues = [];
                if (field.value !== '') {
                    if (field.type === 'AGGREGATE_NUM') {
                        fieldValues = JSON.parse(field.value);
                        value = fieldValues.aggregate;
                    } else {
                        fieldValues = JSON.parse(field.value);
                        if (fieldValues.length > 0) {
                            value = fieldValues[0];
                        }
                    }
                }
                if (field.required && value === '') {
                    isError = true;
                }
                if (field.field_error_message !== '') {
                    isError = true;
                }
                tempFields.push({
                    id: field.id, formId: props.form.id, type: field.type, valueArray: fieldValues, value, label: field.label, required: field.required, error: isError, field_error_message: field.field_error_message,
                });
            });
        }
        setFields(tempFields);
        setTaskID(props.application_detail_form.id);
        setRoleID(props.application_detail_form.role_id);
    }, [props]);

    return (
        <div>
            {fields.find((o) => o.id === 277) !== undefined && props.form.fields !== undefined ?
                <Committee
                    form_checkable={props.form.checkable}
                    field_required={fields.find((o) => o.id === 277).required}
                    field_value={fields.find((o) => o.id === 277).valueArray}
                    field_label={fields.find((o) => o.id === 277).label}
                    field_committee_id={props.form.fields.find((o) => o.id === 277).committee_name_id}
                    key={277}
                /> : <div></div>
            }
            <div style={{ textAlign: 'right', paddingTop: '10px', margin: '0 15px 10px' }}>
                <Grid justify-xs-flex-end="true">
                    <div style={{ display: props.form.checkable ? 'block' : 'none' }}>
                        <FormSave
                            //setSavedFormID={props.setSavedFormID}
                            //setShowForm={props.setShowForm}
                            form_id={props.form.id}
                            fields={fields}
                            task_id={taskID}
                            role_id={roleID}
                            application_id={props.application_id}
                            requesting={props.requesting}
                            submitableFormList={submitableFormList}
                        />
                    </div>
                </Grid>
            </div>
        </div>
    );
};
export default Form52Comp;