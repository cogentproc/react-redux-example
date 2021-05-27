import clsx from 'clsx';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import isSameDay from 'date-fns/isSameDay';
import endOfWeek from 'date-fns/endOfWeek';
import React, { useState, useEffect } from 'react';
import startOfWeek from 'date-fns/startOfWeek';
import isWithinInterval from 'date-fns/isWithinInterval';
import { createStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { IconButton, withStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function WeekPicker(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (Array.isArray(props.value)) {
      if (props.value.length > 0) {
        setSelectedDate(props.value[0]);
      } else {
        setSelectedDate(new Date());
      }
    } else if (props.value.trim() === '') {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(props.value);
    }
  }, [props]);

  const handleWeekChange = (date) => {
    if (!props.disabled) {
      var dateObject = new Date(Date.parse(date));
      setSelectedDate(startOfWeek(dateObject));
      props.setWeekSelectField(format(startOfWeek(dateObject), 'M-d-yyyy').toString());
    }
  };

  /**/
  const formatWeekSelectLabel = (date, invalidLabel) => {
    var dateObject = new Date(Date.parse(date));
    const dateClone = dateObject;

    return dateClone && isValid(dateClone)
      ? `Week of ${format(startOfWeek(dateClone), 'MMM do')}`
      : invalidLabel;
  };
  const toolbarComp = () => (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Typography data-mui-test="picker-toolbar-title" color="inherit" variant="overline">
        {`Week of ${format(startOfWeek(new Date(Date.parse(selectedDate))), 'MMM do')}`}
      </Typography>
    </div>
  );
    /**/

  const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = props;
    var dateObject = new Date(Date.parse(date));
    const dateClone = dateObject;
    var selectedDateObject = new Date(Date.parse(selectedDate));
    const selectedDateClone = selectedDateObject;

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    const wrapperClassName = clsx({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay,
    });

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span>
            {' '}
            {format(dateClone, 'd')}
            {' '}
          </span>
        </IconButton>
      </div>
    );
  };

  return (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InputLabel
        id={`label${props.id}`}
        error={props.error === 'true'}
        shrink
      >
        {props.label}
      </InputLabel>
      <DatePicker
                // disableToolbar
        orientation="landscape"
        disabled={props.disabled}
        label="Week picker"
        value={selectedDate}
        variant="static"
        onChange={handleWeekChange}
        renderDay={renderWrappedWeekDay}
        ToolbarComponent={toolbarComp}
      />
    </MuiPickersUtilsProvider>
  );
}

const styles = createStyles((theme) => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
}));

export default withStyles(styles)(WeekPicker);
