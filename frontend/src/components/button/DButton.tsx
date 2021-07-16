import React from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import './button.scss';

interface PropsType extends ButtonProps {
  buttonType?: 'icon';
}

class DButton extends React.PureComponent<PropsType> {

  render() {
    const { children, className, buttonType, onClick } = this.props;
    let stylesButton = '';
    if (buttonType === 'icon') {
      stylesButton = 'btn_icon';
    };

    return (
      <Button onClick={onClick} className={`btn_container ${className} ${stylesButton}`}>
        {children}
      </Button>
    );
  }
}

export default DButton;
