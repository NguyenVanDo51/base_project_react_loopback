import React from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DButton from '../../components/button/DButton';
import DInput from '../../components/input/DInput';
import DModal from '../../components/modal/DModal';
import { callApi } from '../../contants/network';
import Path from '../../contants/Path';
import { ProjectType } from '../../contants/Types';
import { Change_Project_List } from '../../redux/dispatchAction';
import { RootStateType } from '../../redux/store';
import './project_page.scss';

const ProjectPage = ({ ...props }) => {
  const { projects } = useSelector(({ rootReducer }: RootStateType) => rootReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [isShowModalCreateProject, setShowModalCreateProject] = useState(false);
  const [project, setProject] = useState<ProjectType>({
    name: '',
  });

  const createProject = async () => {
    const res = await callApi(Path.projects, "POST", {
      name: project.name
    });
    if (res.status === 200) {
      setShowModalCreateProject(false);
      dispatch({ type: Change_Project_List, payload: [...projects, {...res.data}] });
    }
  }

  return (
    <>
      <div className="container project_list_container">
      <div className="header_project">
        <span className="text_large_bold">{t('projects')}</span>
        <DButton onClick={() => setShowModalCreateProject(true)}>{t('create_project')}</DButton>
      </div>
      <div className="content_container">
        <div className="search_project_container">
          <DInput value={search} onChangeText={(text) => setSearch(text)} placeHolder="Search" />
        </div>
        <div className="project_list_container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{t('name')}</th>
                <th>{t('key')}</th>
                <th>{t('lead')}</th>
                <th>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {
                projects.length > 0 && projects.map((project) => (
                  <tr>
                    <td><Link to={`/projects/${project.id}`}>{project.name}</Link></td>
                    <td>{project.key}</td>
                    <td>{project.lead}</td>
                    <td></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
      </div>
      <DModal show={isShowModalCreateProject} onConfirm={createProject} onHide={() => setShowModalCreateProject(false)}
        title={t('create_project')}
      >
        <DInput id="name_project" value={project.name} label={t('name')} onChangeText={(text) => setProject({ ...project, name: text })} />
      </DModal>
    </>
  )
}

export default ProjectPage;
