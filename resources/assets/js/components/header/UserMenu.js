import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function UserMenu(props) {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px' }}
      onClick={({ key }) => {
        if(key == 4){
          props.onLogout();
        }
      }}
    >
      <Menu.Item className="headerMenuItemAreas" key="1">
        <Link to='/no-smoking'>
            V
        </Link>
      </Menu.Item>
      <Menu.Item className="headerMenuItemAreas" key="2">
        <Link to='/smoking'>
            N
        </Link>
      </Menu.Item>
      <Menu.Item className="headerMenuItemAreas" key="3">
        <Link to='/outside'>
            D
        </Link>
      </Menu.Item>
      <Menu.Item className="headerMenuItem" key="4">
                Logout
      </Menu.Item>
    </Menu>
  );
}

export default UserMenu;
