import React, {  ReactNode, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import LeftMenu from '../../components/leftMenu/LeftMenu';
import useUser from '../../contants/hooks/useUser';
import ProjectPage from '../../pages/projects/ProjectPage';
import { RootStateType } from '../../redux/store';
import './layout.scss';

const LayoutLeftMenu: React.FC<any> = (props) => {
  const {match} = props;
  const user = useUser();
  console.log({user});
  const history = useHistory();
  useEffect(() => {
    if (!user) history.push('/login');
  });

  let Children: React.ReactNode = <ProjectPage {...props} />;
  switch(match.path) {
    case "/projects":
      Children = <ProjectPage {...props} />;
      break;
    case "/projects/:project_id":
      Children = <ProjectPage {...props} />;
      break;
    default:
      break;
  }

  return (
    <>
      <div className='root_container'>
        <div className='content_page'>
          <Header />
          <main>
            {Children}
          </main>
        </div>
      </div>
    </>
  );
}

export default LayoutLeftMenu;
