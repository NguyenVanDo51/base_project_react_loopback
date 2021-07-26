import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';

type DInputType = FormControlProps & {
  placeHolder?: string;
  label?: string;
  underText?: string;
  onChangeText?: (text: string) => void;
}

const DInput: React.FC<DInputType> = ({ placeHolder, label, type = 'text', underText, onChangeText, onChange, id, ...props }) => {

  const onChangeCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.target.value);
    onChange && onChange(e)
  }

  return (
    <>
      <Form.Group controlId="formBasicEmail">
        {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
        <Form.Control type={type} placeholder={placeHolder} onChange={onChangeCustom} id={id} {...props} />
        {underText && <Form.Text className="text-muted">
          {underText}
        </Form.Text>
        }
      </Form.Group>
    </>
  )
}

export default DInput;
