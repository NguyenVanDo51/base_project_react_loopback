import React from 'react';
import './button.scss';

interface PropsType {
  buttonType?: 'icon' | 'link';
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

const DButton: React.FC<PropsType> = ({ children, className, buttonType, onClick, variant = 'primary', ...props }) => {
    let stylesButton = `btn_${variant}`;
    if (buttonType === 'icon') {
      stylesButton += ' btn_icon';
    };

    return (
      <button onClick={onClick} className={`btn_container ${className} ${stylesButton}`} {...props}>
        {children}
      </button>
    );
};

export default DButton;
