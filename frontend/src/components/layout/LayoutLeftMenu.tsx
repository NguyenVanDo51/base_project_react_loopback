import React, { useState } from 'react';
import './layout.scss';
import Header from '../header/Header';
import LeftMenu from '../leftMenu/LeftMenu';

export default function LayoutLeftMenu({ children }: any) {
  const [isShowLeftMenu, setShowLeftMenu] = useState(true);

  const handleHiddenLeftMenu = () => {
    setShowLeftMenu(!isShowLeftMenu);
  };

  return (
    <>
      <div className='root_container'>
        <div className='content_page'>
          <Header
            handleHiddenLeftMenu={handleHiddenLeftMenu}
          />
          <main>
            <div className='main_container'>
              <LeftMenu isShowLeftMenu={isShowLeftMenu} />
              <div>
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
