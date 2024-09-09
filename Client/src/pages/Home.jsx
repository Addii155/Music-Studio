import React from 'react';
import state from '../store';
import {snapshot} from 'valtio';
import Layout from '../components/Layout';

const Home = () => {
    const snap = snapshot(state);
   
  return (
   <>
     <Layout/>
    
   
   </>
  )
}

export default Home