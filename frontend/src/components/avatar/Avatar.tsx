import React from 'react';
import './avatar.scss';

interface PropsType {
  text: string;
}

class Avatar extends React.PureComponent<PropsType> {

  render() {
    const { text } = this.props;

    return (
      <div className='container'>
        <span className={`text_small_bold text`}>{text}</span>
      </div>
    );
  }
}

export default Avatar;
