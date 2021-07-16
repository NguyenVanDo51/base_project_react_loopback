import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootStateType } from '../../redux/store';
import './left_menu.scss';

type LeftMenuType = {
  isShowLeftMenu: boolean;
}

const LeftMenu: React.FC<LeftMenuType> = ({ isShowLeftMenu }) => {
  // const { projects } = useSelector(({ rootReducer }: RootStateType) => rootReducer);

  return (
    <div className={isShowLeftMenu ? 'left_menu' : 'left_menu width_0_animated'}>
      <div className='project_container' />
    </div>
  );
};

export default LeftMenu;
