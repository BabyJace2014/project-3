import React from "react";

const ClubLink = (props) => (

        <a  href="#"
            data-clubname={props.clubname}
            onClick={props.onClick.bind(this, props.clubname)}>
            {props.children}
        </a>

);

export default ClubLink;