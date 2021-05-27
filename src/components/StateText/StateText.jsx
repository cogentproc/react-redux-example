import React from 'react';

const StateText = (value) => {
  // eslint-disable-next-line default-case
  switch (value) {
    case 0:
      return 'Draft';
    case 1:
      return 'Test';
    case 2:
      return 'Publish';
    case 3:
      return 'Discontinue';
    case 4:
      return 'Archive';
  }
};

export default StateText;
