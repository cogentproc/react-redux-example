import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import { useHistory } from 'react-router-dom';

import {
  CHECK_BOX,
  COMMITTEE,
  FILE_SHARING,
  WEEK_CALENDAR,
} from 'constants/FieldTypes';

const FormSaveComp = (props) => {
  const history = useHistory();
  const saveForm = (formID) => {
    if (!props.requesting) {
      var isCommittee = false;
      var tempFieldArray = props.fields.filter((item) => item.formId === formID);
      var tempCommitteeFieldArray = [];
      tempFieldArray.forEach((field) => {
        if (field.type === COMMITTEE) {
          isCommittee = true;
          tempCommitteeFieldArray.push({ id: field.id, value: props.role_user === '' ? [] : props.role_user });
        }
        if (field.type === CHECK_BOX) {
          field.value = field.valueArray;
        } else if (field.type === FILE_SHARING) {
          if (props.share_file !== undefined && props.share_file.length > 0) {
            var tempObj = props.share_file.find((o) => o.field_id === field.id);
            if (tempObj !== undefined) {
              var tempArray = [tempObj.file_id, tempObj.file_url, tempObj.user_id, tempObj.file_name, tempObj.file_path];
              field.value = tempArray;
            } else {
              field.value = props.fields.find((o) => o.id === field.id).valueArray;
            }
          } else {
            field.value = props.fields.find((o) => o.id === field.id).valueArray;
          }
        } else if (field.type === WEEK_CALENDAR) {
          var tempValueArray = [];
          if (props.weekSelect === '') {
            tempValueArray.push(format(startOfWeek(new Date()), 'M-d-yyyy').toString());
          } else {
            tempValueArray.push(props.weekSelect);
          }
          field.value = tempValueArray;
        } else {
          var tempValueArray1 = [];
          if (typeof field.value === 'string' || field.value instanceof String) {
            tempValueArray1.push(field.value.trim());
          } else {
            tempValueArray1.push(field.value);
          }
          field.value = tempValueArray1;
        }
      });
      tempFieldArray = tempFieldArray.map(({ role_id, ...item }) => item);
      tempFieldArray = tempFieldArray.map(({ label, ...item }) => item);
      tempFieldArray = tempFieldArray.map(({ required, ...item }) => item);
      tempFieldArray = tempFieldArray.map(({ field_error_message, ...item }) => item);
      tempFieldArray = tempFieldArray.map(({ type, ...item }) => item);
      tempFieldArray = tempFieldArray.map(({ formId, ...item }) => item);
      tempFieldArray = tempFieldArray.map(({ valueArray, ...item }) => item);
      tempFieldArray = tempFieldArray.map(({ error, ...item }) => item);

      if (isCommittee) {
        props.postApplicationDetailCommittee(props.application_id, { form_id: formID, task_id: props.task_id, fields: tempCommitteeFieldArray });
      } else {
        props.postApplicationDetail(props.application_id, { form_id: formID, task_id: props.task_id, fields: tempFieldArray });
      }
    }
  };
  const handlePreviousClick = (e) => {
    saveForm(e);
    var formID = ""
    if (props.submitableFormList.length > 0) {
      var currentFormIndex = props.submitableFormList.findIndex(list => list.id === props.form_id)
      if (currentFormIndex > 0) {
        formID = props.submitableFormList[currentFormIndex - 1].id
      }
    }
    if (formID !== "") {
      history.push(`/detail/form/` + props.application_id + '/' + props.role_id + '/' + formID);
    }
  };
  const handleSaveClick = (e) => {
    saveForm(e);
  };
  const handleNextClick = (e) => {
    saveForm(e);
    var formID = ""
    if (props.submitableFormList.length > 0) {
      var currentFormIndex = props.submitableFormList.findIndex(list => list.id === props.form_id)
      if (currentFormIndex < props.submitableFormList.length) {
        formID = props.submitableFormList[currentFormIndex + 1].id
      }
    }
    if (formID !== "") {
      history.push(`/detail/form/` + props.application_id + '/' + props.role_id + '/' + formID);
    }
  };

  var displayPreviousButton = true;
  var displaySaveButton = true;
  var displayNextButton = true;
  if (props.submitableFormList.length > 0) {
    if (props.submitableFormList[0].id === props.form_id) {
      displayPreviousButton = false;
    }
  }
  if (props.submitableFormList.length < 1) {
    displayPreviousButton = false;
    displaySaveButton = false;
    displayNextButton = false;
  }
  return (
    <div>
      <Button
        onClick={handlePreviousClick.bind(this, props.form_id)}
        color="primary"
        round
        style={{ display: displayPreviousButton ? 'inline-block' : 'none' }}
        variant="contained"
      >
        {props.requesting
          ? <CircularProgress size={20} color="inherit" />
          : <NavigateBefore />}
           &nbsp;&nbsp;Previous
      </Button>
      &nbsp;&nbsp;
      <Button
        onClick={handleSaveClick.bind(this, props.form_id)}
        color="primary"
        round
        style={{ display: displaySaveButton ? 'inline-block' : 'none' }}
        variant="contained"
      >
        {props.requesting
          ? <CircularProgress size={20} color="inherit" />
          : <SaveIcon />}
          &nbsp;&nbsp;Save
      </Button>
      &nbsp;&nbsp;
      <Button
        onClick={handleNextClick.bind(this, props.form_id)}
        color="primary"
        round
        style={{ display: displayNextButton ? 'inline-block' : 'none' }}
        variant="contained"
      >
        Next&nbsp;&nbsp;
        {props.requesting
          ? <CircularProgress size={20} color="inherit" /> : <NavigateNext />}
      </Button>
    </div>
  );
};

export default FormSaveComp;
