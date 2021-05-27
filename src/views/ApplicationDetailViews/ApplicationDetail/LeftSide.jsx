import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import CompletedIcon from '@material-ui/icons/FiberManualRecord';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCompletedIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const LeftSide = (props) => {
    const [formCategoryArray, setFormCategoryArray] = useState([]);
    const [formArray, setFormArray] = useState([]);
    const [currentForm, setCurrentForm] = useState(0);
    const [submitableFormList, setSubmitableFormList] = useState([]);
    const [allFormsCompleted, setAllFormsCompleted] = useState([]);
    const history = useHistory();


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


    const treeCatItems = [];
    const formItems = [];
    const useTreeItemStyles = makeStyles((theme) => ({
        group: {
            marginLeft: 2,
        },
        iconContainer: {
            width: '0px',
            display: 'flex',
            flexShrink: 0,
            marginRight: '0px',
            justifyContent: 'center',
        },
    }));
    const classes = useTreeItemStyles();
    formCategoryArray.forEach((element) => {
        const treeItems = [];
        formArray.forEach((form) => {
            if (form.form_category_title === element) {
                var objIndex = submitableFormList.findIndex((obj) => obj.id === form.id);
                if (objIndex === -1) {
                    treeItems.push(
                        <div>
                            <TreeItem
                                icon={<CompletedIcon />}
                                key={`${form.id}`}
                                nodeId={`${form.id}`}
                                label={(
                                    <div style={{ display: 'flex' }}>
                                        <Typography style={{ fontSize: '14px' }} variant="body1" color="inherit">{form.title}</Typography>
                                    </div>
                                )}
                            />
                            <br />
                        </div>,
                    );
                } else {
                    treeItems.push(
                        <div>
                            <TreeItem
                                key={`${form.id}`}
                                icon={form.completed ? <CheckCompletedIcon style={{ color: 'green' }} /> : <ErrorIcon style={{ color: 'purple' }} />}
                                nodeId={`${form.id}`}
                                label={(
                                    <div style={{ display: 'flex' }}>
                                        <Typography style={{ color: form.completed ? 'green' : 'purple', fontSize: '14px' }} variant="body1" color="inherit">{form.title}</Typography>
                                    </div>
                                )}
                            />
                            <br />
                        </div>,
                    );
                }
            }
        });
        treeCatItems.push(
            <div>
                <TreeItem
                    classes={{ group: classes.group, iconContainer: classes.iconContainer }}
                    key={element}
                    nodeId={element}
                    label={(
                        <div style={{ display: 'flex', paddingLeft: '1px' }}>
                            <Typography style={{ fontSize: '16px', fontWeight: 'bold' }} variant="body1" color="inherit">{element}</Typography>
                        </div>
                    )}
                >
                    <br />
                    {treeItems}
                </TreeItem>
            </div>,
        );
    });
    const handleTreeNodeSelect = (event, nodeID) => {
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(nodeID)) {
            history.push(`/detail/form/` + props.application.id + '/' + props.application_detail.role_id + '/' + nodeID);
            //props.setShowForm('save', nodeID);
        }
    }
   
    return (
        <div>
            <TreeView
                expanded={formCategoryArray}
                onNodeSelect={handleTreeNodeSelect}
                selected={`${currentForm}`}
            >
                {treeCatItems}
            </TreeView>
        </div>
    );
};
export default LeftSide;
