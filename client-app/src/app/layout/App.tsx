import { useEffect } from 'react'
import {Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';

function App() {

    const location=useLocation();
    const {userStore, commonStore} =useStore();

    useEffect(()=>{
      if(commonStore.token){
        userStore.getUser().finally(()=>commonStore.setUploaded());
      }else{
        commonStore.setUploaded()
      }
    }, [commonStore,userStore]);
    if(!commonStore.uploaded) return <LoadingComponent content='Loading App...' />
  return (
    <>
    <ScrollRestoration/>
    <ModalContainer/>
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
    {location.pathname==="/" ? <HomePage/> : (
      <>
        {/* onclick eventi için başında parantez kullanmadıgımızda button tıklanmadan da makesound fonksiyonu calısır. */}
        {/* <Header as="h2" icon="users" content="Reactivities"/> */}
        <NavBar/>
          <Container style={{marginTop:'7em'}}>
              <Outlet/>
          </Container>
      </>
    )}
    </>
  );
}

export default observer (App);
