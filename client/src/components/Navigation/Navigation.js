import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class MenuExampleHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item header>APP NAME</Menu.Item>
        <Menu.Menu position='right'>
        <Menu.Item
          name='Club Page'
          active={activeItem === 'Club Page'}
          onClick={this.handleItemClick}
          redirect='/club'
        />
        <Menu.Item 
          name='Profile' 
          active={activeItem === 'Profile'}
          onClick={this.handleItemClick}
          redirect='/profile'
         />
        </Menu.Menu>
      </Menu>
    )
  }
}



