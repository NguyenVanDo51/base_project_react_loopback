import React, { useEffect } from 'react';
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import './header.scss';
import DButton from '../button/DButton';
import { Change_Project_List, Change_User } from '../../redux/dispatchAction';
import { Link, useHistory } from 'react-router-dom';
import Color from '../../contants/Color';
import { RootStateType } from '../../redux/store';
import { callApi } from '../../contants/network';
import { useTranslation } from 'react-i18next';
import useUser from '../../contants/hooks/useUser';
import Path from '../../contants/Path';

interface HeaderType {
  handleHiddenLeftMenu?: () => void;
}

const Header: React.FC<HeaderType> = ({ handleHiddenLeftMenu }) => {
  const { projects } = useSelector(({ rootReducer }: RootStateType) => {
    return { ...rootReducer };
  });

  const user = useUser();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const history = useHistory();

  const getProjectList = async () => {
    const { data } = await callApi(Path.projects, "GET");
    dispatch({ type: Change_Project_List, payload: data });
  };



  useEffect(() => {
    projects.length < 1 && getProjectList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogoutSuccess = () => {
    history.push('/login');
    dispatch({ type: Change_User, payload: null });
  }

  return (
    <header>
      <nav className='nav_bar_main'>
        <div className='icon_container'>
          <Link to="/">
            Todo-App
          </Link>
          <DropdownButton
            as={ButtonGroup}
            variant="Projects"
            title={t('projects')}
            className='menu_item'
          >
            {
              projects.length > 0 && projects.map((project, index) => (
                <Dropdown.Item eventKey={index} key={project.id}>
                  <Link to={`/projects/${project.id}`} key={project.id}>
                    <span className={`text_nomal $'project_item'`}>{project.name}</span>
                  </Link>
                </Dropdown.Item>
              ))
            }
          </DropdownButton>
        </div>
        <div>
          {!user ? (
            <DButton>
              <Link to="/login">{t('login')}</Link>
            </DButton>
          ) : (
            <div className='header_right'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={Color.mainColor}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <DButton buttonType="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 26 30"
                  fill={Color.mainColor}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3067 27C15.0723 27.4041 14.7358 27.7395 14.331 27.9727C13.9261 28.2059 13.4672 28.3286 13 28.3286C12.5328 28.3286 12.0739 28.2059 11.669 27.9727C11.2642 27.7395 10.9277 27.4041 10.6933 27M21 9.66666C21 7.54492 20.1571 5.51009 18.6569 4.0098C17.1566 2.50951 15.1217 1.66666 13 1.66666C10.8783 1.66666 8.84344 2.50951 7.34315 4.0098C5.84286 5.51009 5 7.54492 5 9.66666C5 19 1 21.6667 1 21.6667H25C25 21.6667 21 19 21 9.66666Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </DButton>
              <DropdownButton
                as={ButtonGroup}
                variant="Projects"
                title={user?.lastName}
                className='menu_item'
              >
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
                  buttonText="Logout"
                  onLogoutSuccess={onLogoutSuccess}
                  render={(renderProps => {
                    return (
                      <Dropdown.Item onClick={renderProps.onClick}>
                        {t('logout')}
                      </Dropdown.Item>
                    )
                  })}
                >
                </GoogleLogout>
              </DropdownButton>
            </div>
          )}
        </div>
      </nav>

    </header>
  );
};

export default Header;
