import React from 'react';

import Chip from '@material-ui/core/Chip';
import DraftIcon from '@material-ui/icons/Build';
import TestIcon from '@material-ui/icons/PlaylistAddCheck';
import PublishIcon from '@material-ui/icons/Public';
import DiscontinueIcon from '@material-ui/icons/PanTool';
import ArchiveIcon from '@material-ui/icons/HighlightOff';
import StateText from 'components/StateText/StateText.jsx';

const StateUI = (value, size) => {
  // eslint-disable-next-line default-case
  switch (value) {
    case 0:
      return <Chip size={size} icon={<DraftIcon style={{ color: '#fb8c00', paddingLeft: '5px' }} />} label={StateText(value)} />;
    case 1:
      return <Chip size={size} icon={<TestIcon style={{ color: '#00acc1', paddingLeft: '5px' }} />} label={StateText(value)} />;
    case 2:
      return <Chip size={size} icon={<PublishIcon style={{ color: '#43a047', paddingLeft: '5px' }} />} label={StateText(value)} />;
    case 3:
      return <Chip size={size} icon={<DiscontinueIcon style={{ color: '#e53935', paddingLeft: '5px' }} />} label={StateText(value)} />;
    case 4:
      return <Chip size={size} icon={<ArchiveIcon style={{ color: '#e91e63', paddingLeft: '5px' }} />} label={StateText(value)} />;
  }
};

export default StateUI;
