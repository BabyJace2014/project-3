import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class Navigation extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    const isClub = this.props.page.slice(0,4) === "Club" ? true : false;
        
    return (
      <Menu size='massive'>
        <Menu.Item header>BOOKWORMZ</Menu.Item>
        <Menu.Item
          name={this.props.page}
         />
        <Menu.Menu position='right'>
        { isClub ?
          <Menu.Item 
            name='Profile' 
            active={activeItem === 'Profile'}
            onClick={this.handleItemClick}
            as={Link}
            to='/profile'
           />
          :
          ""
        }
         <Menu.Item
           name='Logout'
           active={activeItem === 'Logout'}
           onClick={this.handleItemClick}
           as={Link}
           to='/logout'
          />
        </Menu.Menu>
      </Menu>
      
    )
  }
}

export default Navigation;