import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import CompletedIcon from '@material-ui/icons/FiberManualRecord';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCompletedIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const StepperUI = (props) => {
    const [formCategoryArray, setFormCategoryArray] = useState([]);
    const [formArray, setFormArray] = useState([]);
    const [currentForm, setCurrentForm] = useState(0);
    const [submitableFormList, setSubmitableFormList] = useState([]);
    const [allFormsCompleted, setAllFormsCompleted] = useState([]);
    const [activeStep, setActiveStep] = React.useState(2);

    useEffect(() => {
        var tempFormCategoryArray = [];
        var tempFormIDArray = [];
        var tempAllFormsCompleted = true;
        var tempSubmitableFormList = [];

        if (props.forms !== undefined) {
            props.forms.forEach((form, index) => {
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

                tempFormCategoryArray.push(form.form_category_title);
                tempFormIDArray.push({ id: form.id, display: false });
            });
            tempFormCategoryArray = Array.from(new Set(tempFormCategoryArray));
            setSubmitableFormList(tempSubmitableFormList);
            setFormCategoryArray(tempFormCategoryArray);
            setFormArray(props.forms);
            setAllFormsCompleted(tempAllFormsCompleted);
        }
    }, [props]);







    return (
        <div>
            <div style={{ display: (submitableFormList.length === 0) ? 'none' : 'block' }}>
                <Stepper activeStep={activeStep}>
                    {submitableFormList.map((step) => (
                        <Step key={step.id}>
                            <StepButton /*onClick={handleStep(step)}*/ completed={step.form_completed}>
                                {step.title}
                            </StepButton>
                        </Step>
                    ))}

                </Stepper>
            </div>
            <br />
        </div>
    );
};
export default StepperUI