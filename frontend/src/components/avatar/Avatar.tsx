import React from 'react';
import './avatar.scss';

interface PropsType {
  image?: string;
  text?: string;
}

class Avatar extends React.PureComponent<PropsType> {

  render() {
    const { text, image } = this.props;

    return (
      <div className='container'>
        {
          image ? <image href={image} /> : <span className={`text_small_bold text`}>{text}</span>
        }
      </div>
    );
  }
}

export default Avatar;
