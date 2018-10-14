import React from "react";
import { Modal, Message } from "semantic-ui-react";

class ProfileEdit extends React.Component {

    render() {

        return (
            <Modal.Content>
                <Message
                        header="Profile Edit Modal!"
                        content="Someday you'll even be able to edit your profile here!"
                />
            </Modal.Content>
        );
    }
}

export default ProfileEdit;