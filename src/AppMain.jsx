import React from 'react';
import { StatusGame } from './components/StatusGame';
import { LuisRMPage } from './pages/LuisRMPage';

export const AppMain = () => {
  return (
    <>
      <div>
        <h1>Hola</h1>
        <StatusGame/>
        <SneyderRMPage/>
        <MatheoRMPage/>
      </div>
    </>
  );
};