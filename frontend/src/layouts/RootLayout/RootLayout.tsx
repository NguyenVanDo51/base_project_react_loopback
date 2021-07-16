import React, {  ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/Header';
import LeftMenu from '../../components/leftMenu/LeftMenu';
import { RootStateType } from '../../redux/store';
import './layout.scss';

const LayoutLeftMenu: React.FC<any> = ({ children, history,...props }) => {
  const { user } = useSelector(({ rootReducer }: RootStateType) => rootReducer);
  const [isShowLeftMenu, setShowLeftMenu] = useState(true);
  console.log(history);

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

export default LayoutLeftMenu;
