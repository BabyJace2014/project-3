import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class MenuExampleHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item header>APP NAME</Menu.Item>
        <Menu.Menu position='right'>
        <Menu.Item
          name='Club Page'
          active={activeItem === 'Club Page'}
          onClick={this.handleItemClick}
          as={Link}
          to='/club'
        />
        <Menu.Item 
          name='Profile' 
          active={activeItem === 'Profile'}
          onClick={this.handleItemClick}
          as={Link}
          to='/profile'
         />
         <Menu.Item
           name='Logout'
           active={activeItem === 'Logout'}
           onClick={this.handleItemClick}
           as={Link}
           to='/logout'
          />
        </Menu.Menu>
      </Menu>
      </Segment>
    )
  }
}



