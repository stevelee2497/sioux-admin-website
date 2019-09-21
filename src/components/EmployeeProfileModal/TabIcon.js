import React from 'react';
import { Icon } from 'antd';

const TabIcon = ({ icon, title }) => (
  <span style={{ margin: 0 }}>
    <Icon type={icon} />
    {title}
  </span>
);

export default TabIcon;
