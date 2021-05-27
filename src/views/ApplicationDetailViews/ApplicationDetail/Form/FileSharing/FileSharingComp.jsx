/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const FileSharingComp = (props) => {
  const [uploadType, setUploadType] = useState('AWS');
  const [fileKeyAWS, setFileKeyAWS] = useState('');
  const [dropboxAccessToken, setDropboxAccessToken] = useState('');
  const [dropboxURL1, setDropboxURL1] = useState('');
  const [dropboxURL2, setDropboxURL2] = useState('');
  const [presignedAWSPUTURL, setPresignedAWSPUTURL] = useState('');
  const [presignedAWSGETURL, setPresignedAWSGETURL] = useState('');
  const [filePath, setFilePath] = useState('');
  const [shareFileLocal, setShareFileLocal] = useState(null);
  const [displayUploadProgress, setDisplayUploadProgress] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const [fileUploadError, setFileUploadError] = useState('');

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });

  const classes = useStyles();
  const { getFileSharingServer } = props;
  useEffect(() => {
    // if (props.field_role_id === props.role_id) {
    var keyStr = '';
    if (props.field_value.length > 0) {
      keyStr = props.field_value[0];
    }
    getFileSharingServer(keyStr, props.field_id);
    // }
  }, [getFileSharingServer]);

  useEffect(() => {
    if (props.application_id !== undefined) {
      var tempPath = `/${localStorage.getItem('network_id')}/${localStorage.getItem('workflow_id')}/${props.application_id}/${localStorage.getItem('user_id')}/`;
      setFilePath(tempPath);
    }
    if (props.filesharing_list.type === 'FILE_SHARING_DROP_BOX') {
      setUploadType('DROP_BOX');
      setDropboxAccessToken(props.filesharing_list.token);
      setDropboxURL1(props.filesharing_list.api_endpoint1);
      setDropboxURL2(props.filesharing_list.api_endpoint2);
    } else if (props.filesharing_list.type === 'FILE_SHARING_DROP_BOX'
      || props.filesharing_list.type === 'FILE_SHARING_AWS_DEFAULT') {
      setUploadType('AWS');
      if (props.filesharing_list.setting4 === props.field_id.toString()) {
        setPresignedAWSPUTURL(props.filesharing_list.api_endpoint1);
        setPresignedAWSGETURL(props.filesharing_list.api_endpoint2);
        setFileKeyAWS(props.filesharing_list.setting3);
      }
    }

    if (props.share_file.find((o) => o.field_id === props.field_id) !== undefined) {
      if (props.share_file.find((o) => o.field_id === props.field_id).file_name === props.field_value[3]) {
        props.setShareFile([]);
      }
    }

    // console.log(dropboxAccessToken)
    // console.log(dropboxURL1)
    // console.log(dropboxURL2)
    // console.log(filePath)
    // console.log(props.field_id)
    // console.log(props.application_id)
    // console.log(props.field_value)
    // console.log(props.field_role_id)
    // console.log(props.role_id)
    // console.log(props.share_file)
    if (props.field_value.length > 0) {
      setDisplayUploadProgress(false);
    }
  }, [props]);
  function dropboxUploadFile() {
    var xhr = new XMLHttpRequest();
    var dropboxToken = dropboxAccessToken;

    if (shareFileLocal === null) {
      return;
    }
    xhr.upload.onprogress = function (evt) {
      var percentComplete = parseInt(100.0 * (evt.loaded / evt.total), 10);
      setProgress(percentComplete * (18 / 20));
    };
    xhr.extraInfo = dropboxURL2;
    xhr.onload = function () {
      if (xhr.status === 200) {
        var fileInfo = JSON.parse(xhr.response);
        var xhrShare = new XMLHttpRequest();
        xhrShare.onload = function () {
          if (xhrShare.status === 200) {
            var bodyJson = JSON.parse(xhrShare.response);

            var shareFileTemp = {
              field_id: props.field_id, file_id: fileInfo.id, file_url: bodyJson.url, user_id: localStorage.getItem('user_id'), file_name: fileInfo.name, file_path: fileInfo.path_lower,
            };
            var filtered = props.share_file.filter((value, index, arr) => value.field_id !== props.field_id);
            filtered.push(shareFileTemp);
            props.setShareFile(filtered);
            setProgress(100);
            setShareFileLocal(null);
          } else {
            var errorBodyJson = JSON.parse(xhrShare.response);
            if (errorBodyJson.error_summary.substr(0, 35) === 'shared_link_already_exists/metadata') {
              var shareFileTemp1 = {
                field_id: props.field_id, file_id: fileInfo.id, file_url: errorBodyJson.error.shared_link_already_exists.metadata.url, user_id: localStorage.getItem('user_id'), file_name: fileInfo.name, file_path: fileInfo.path_lower,
              };
              var filtered1 = props.share_file.filter((value, index, arr) => value.field_id !== props.field_id);
              filtered1.push(shareFileTemp1);
              props.setShareFile(filtered1);
              setProgress(100);
              setShareFileLocal(null);
            }
          }
        };
        var localDropboxURL2 = xhr.extraInfo;
        localDropboxURL2 += '/sharing/create_shared_link_with_settings';
        xhrShare.open('POST', localDropboxURL2);
        xhrShare.setRequestHeader('Authorization', `Bearer ${dropboxToken}`);
        xhrShare.setRequestHeader('Content-Type', 'application/json');

        var dataStr = JSON.stringify({ path: fileInfo.path_lower /* , "settings": { "requested_visibility": "public", "audience": "public", "access": "viewer" } */ });
        xhrShare.send(dataStr);
      } else {
        // console.log(xhr.response)
        setFileUploadError('Unable to Upload file.');
      }
    };
    xhr.open('POST', `${dropboxURL1}/files/upload`);
    xhr.setRequestHeader('Authorization', `Bearer ${dropboxToken}`);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
      path: filePath + shareFileLocal.name,
      mode: 'add',
      autorename: true,
      mute: false,
    }));

    xhr.send(shareFileLocal);
  }
  function awsUploadFile() {
    var xhr = new XMLHttpRequest();
    if (shareFileLocal === null) {
      return;
    }
    xhr.upload.onprogress = function (evt) {
      var percentComplete = parseInt(100.0 * (evt.loaded / evt.total), 10);
      setProgress(percentComplete * (18 / 20));
    };
    xhr.onload = function () {
      if (xhr.status === 200) {
        var shareFileTemp = {
          field_id: props.field_id, file_id: fileKeyAWS, file_url: '', user_id: localStorage.getItem('user_id'), file_name: shareFileLocal.name, file_path: '',
        };
        var filtered = props.share_file.filter((value, index, arr) => value.field_id !== props.field_id);
        filtered.push(shareFileTemp);
        props.setShareFile(filtered);
        setProgress(100);
        setShareFileLocal(null);
      } else {
        // console.log(xhr.response)
        setFileUploadError('Unable to Upload file.');
      }
    };
    xhr.open('PUT', presignedAWSPUTURL);
    xhr.send(shareFileLocal);
  }
  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    if (uploadType === 'DROP_BOX') {
      dropboxUploadFile();
    } else if (uploadType === 'AWS') {
      awsUploadFile();
    }
  };

  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      setShareFileLocal(e.target.files[0]);
      setDisplayUploadProgress(true);
      setProgress(0);
      setFileUploadError('');
    }
  };

  return (
    <Card>
        <FormControl
          required={props.field_required === 'true'}
          error={props.fields.find((o) => o.id === props.field_id).error}
          id={props.field_id}
          key={`fileSharingForm${props.field_id}`}
          component="fieldset"
        >
          <FormLabel>{props.field_label}</FormLabel>
        </FormControl>
        <br />
        {shareFileLocal ? `New File: ${shareFileLocal.name}` : ''}
        {props.share_file.find((o) => o.field_id === props.field_id) !== undefined ? `New File: ${props.share_file.find((o) => o.field_id === props.field_id).file_name}` : ''}
        <br />
        {props.field_value.length > 0
          ? <a href={uploadType == 'AWS' ? presignedAWSGETURL : props.field_value[1]} target="_blank" rel="noreferrer">{props.field_value[3]}</a>
          : ''}
        <br />
        <div style={{ color: 'red', textAlign: 'center' }}>{fileUploadError}</div>
        <br />
        {props.field_role_id === props.role_id
          ? (
            <form onSubmit={onFormSubmit.bind(this)} id="uploadForm">
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <input
                    type="file"
                    onChange={onFileChange.bind(this)}
                    style={{ display: 'none' }}
                    id={`raised-button-userfile${props.field_id}`}
                  />
                  <label htmlFor={`raised-button-userfile${props.field_id}`}>
                    <Button
                      round
                      color="primary"
                      component="span"
                      id={`button${props.field_id}`}
                      key={`button${props.field_id}`}
                    >
                      Select File
                    </Button>
                  </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    round
                    id={`uploadButton${props.field_id}`}
                    key={`uploadButton${props.field_id}`}
                    color="primary"
                    type="submit"
                    style={{ float: 'right' }}
                    disabled={shareFileLocal === null}
                  >
                    Upload File
                  </Button>
                </GridItem>
              </GridContainer>
              <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div
                    className={classes.root}
                    style={{ display: displayUploadProgress ? 'block' : 'none' }}
                  >
                    <LinearProgressWithLabel value={progress} />
                  </div>
                </GridItem>
              </GridContainer>
            </form>
          )
          : ''}
    </Card>
  );
};

export default FileSharingComp;

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(
            props.value,
          )}%`}
        </Typography>
      </Box>
    </Box>
  );
}

/*
function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.getElementById('preview').src = url;
        document.getElementById('avatar-url').value = url;
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}
*/
