import React from 'react';
import { Modal, Button, ModalProps } from 'react-bootstrap';

interface PropsType extends ModalProps {
  onConfirm?: () => void;
  closeText?: string;
  confirmText?: string;
  title?: string;
}

class DModal extends React.PureComponent<PropsType> {

  handleConfirm = () => {
    const { onHide, onConfirm } = this.props;
    onHide();
    onConfirm && onConfirm();
  }

  render() {
    const {
      children, closeText, confirmText, title, onHide, show,
    } = this.props;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          {title && <Modal.Title>{title}</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>{closeText || 'Close'}</Button>
          <Button variant="primary" onClick={this.handleConfirm}>{confirmText || 'Confirm'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DModal;
