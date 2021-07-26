import React from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DButton from '../button/DButton';

interface PropsType extends ModalProps {
  onConfirm?: () => void;
  closeText?: string;
  confirmText?: string;
  title?: string;
}

const DModal: React.FC<PropsType> = ({
  children, closeText, confirmText, title, onHide, show, onConfirm
}) => {

  const {t} = useTranslation();

  const handleConfirm = () => {
    onHide();
    onConfirm && onConfirm();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="d_modal_header">
        {title && <h3 className="text_large_medium">{title}</h3>}
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <DButton variant="secondary" onClick={onHide}>{closeText || t('cancel')}</DButton>
        <DButton onClick={handleConfirm}>{confirmText || t('confirm')}</DButton>
      </Modal.Footer>
    </Modal>
  );
}

export default DModal;
