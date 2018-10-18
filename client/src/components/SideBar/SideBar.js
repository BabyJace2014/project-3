import React from 'react';
// import ProfileEdit from '../../components/ProfileEdit';
// import CreateClub from '../../components/CreateClub';
// import ClubLink from '../../components/ClubLink';


const Sidebar = (props) => (
    <div>
            
        <h3>{props.user.firstname} {props.user.lastname}'s Profile Page</h3>

        <br /><br/>
        <h4>Your Profile Information:</h4>
        <p>Address:  {props.user.address ? props.user.address : ""}</p>
        <p>Phone: {props.user.phone ? props.user.phone : ""}</p>

        <br /><br />
        
        <br /><br />
        
        <br /><br /><br />

        <h4>Club's You Belong To:</h4>
        

    </div>
);


//<ProfileEdit user={props.user} onClose={this.onProfileEditClose} />
//<CreateClub user={props.user} onClose={this.onCreateClubClose} />
//{ props.clubs.map( club => ()) }
//<ClubLink onClick={this.viewClub} clubname={club.clubname}>
// {club.clubname}
//</ClubLink>
export default Sidebar;