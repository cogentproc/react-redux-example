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
import CustomCheckbox from 'components/Field/CustomCheckbox';
import Grid from '@material-ui/core/Grid';
import FormSave from './FormSave';
import FileSharing from './FileSharing'

const Form51Comp = (props) => {
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
                    id: field.id, formId: props.form.id, type: field.type, valueArray: fieldValues, value, label: field.label, required: field.required, error: isError, field_error_message: field.field_error_message, role_id: field.role_id
                });
            });
        }
        setFields(tempFields);
        setTaskID(props.application_detail_form.id);
        setRoleID(props.application_detail_form.role_id);
    }, [props]);

    return (
        <div>
            <Card>
                <div color="primary" style={{ textAlign: 'left', paddingTop: '30px', paddingLeft: '20px' }}>
                    <Typography variant="h5">{props.form.title}</Typography>
                </div>
                <CardContent>
                    <GridContainer>
                        <GridItem key={1} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 281) !== undefined ?
                                    <CustomSelect
                                        field={fields.find((o) => o.id === 281)}
                                        fields={fields}
                                        form={props.form}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 279) !== undefined ?
                                    <CustomTextField
                                        field={fields.find((o) => o.id === 279)}
                                        fields={fields}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 283) !== undefined ?
                                    <CustomTextField
                                        field={fields.find((o) => o.id === 283)}
                                        fields={fields}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 282) !== undefined ?
                                    <CustomTextField
                                        field={fields.find((o) => o.id === 282)}
                                        fields={fields}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 276) !== undefined ?
                                    <CustomRadio
                                        field={fields.find((o) => o.id === 276)}
                                        fields={fields}
                                        form={props.form}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 285) !== undefined ?
                                    <CustomTextField
                                        field={fields.find((o) => o.id === 285)}
                                        fields={fields}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 286) !== undefined ?
                                    <CustomTextField
                                        field={fields.find((o) => o.id === 286)}
                                        fields={fields}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 516) !== undefined ?
                                    <FileSharing
                                        field_required={fields.find((o) => o.id === 516).required}
                                        field_value={fields.find((o) => o.id === 516).valueArray}
                                        field_label={fields.find((o) => o.id === 516).label}
                                        field_id={516}
                                        field_role_id={fields.find((o) => o.id === 516).role_id.toString()}
                                        role_id={roleID.toString()}
                                        application_id={props.application_id}
                                        share_file={props.share_file}
                                        key={516}
                                        fields={fields}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem key={2} xs={12} sm={12} md={6}>
                            <Box mt={2} key={1}>
                                {fields.find((o) => o.id === 517) !== undefined ?
                                    <CustomCheckbox
                                        field={fields.find((o) => o.id === 517)}
                                        fields={fields}
                                        form={props.form}
                                    />
                                    : <div></div>}
                            </Box>
                        </GridItem>
                    </GridContainer>
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
                </CardContent>
            </Card>
        </div>
    );
};
export default Form51Comp;