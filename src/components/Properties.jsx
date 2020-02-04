import React, { useState } from "react";
import { Button, Header, Form, Input, Modal } from "semantic-ui-react";

function Properties({ path, node, handlePropertyChange }) {

  const [primaryText, setPrimaryText] = useState(node.primaryText);
  const [key, setKey] = useState(node.key);
  const [icon, setIcon] = useState(node.icon)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Modal trigger={<Button onClick={handleOpen}>Info</Button>}
        open={modalOpen}
        onClose={handleClose}
    >
      <Modal.Header>{node.primaryText}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Edit Properties</Header>
          <Form onSubmit={onSubmitHandler}>
            <Form.Field>
              <label>Primary Text</label>
              <Form.Input
                width={6}
                value={primaryText}
                onChange={e => onChangeHandler(e, setPrimaryText)}
              />
            </Form.Field>
            <Form.Field>
              <label>Key</label>
              <Form.Input
                width={6}
                value={key}
                onChange={e => onChangeHandler(e, setKey)}
              />
            </Form.Field>
            <Form.Field>
              <label>Icon</label>
              <Form.Input
                width={6}
                value={icon}
                onChange={e => onChangeHandler(e, setIcon)}
              />
            </Form.Field>
            <Button type='submit'>Save</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );

  function onChangeHandler(e, setState) {
    setState(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault()
    handlePropertyChange({
        node,
        path,
        primaryText,
        key,
        icon
    })
    handleClose()
  }

  function handleClose() {
    setModalOpen(false)
  }

  function handleOpen() {
    setModalOpen(true)
  }
}

export default Properties;
