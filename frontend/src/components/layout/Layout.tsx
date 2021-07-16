import React from 'react';
import './layout.scss';
import Header from '../header/Header';

export default function Layout({ children }: any) {
  return (
    <>
      <div className='root_container'>
        <div className='content_page'>
          <Header />
          <main>
            <div className='main_container'>
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
