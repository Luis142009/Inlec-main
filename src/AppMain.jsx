import React from 'react';
import { StatusGame } from './components/StatusGame';
import { LuisRMPage } from './pages/LuisRMPage';
import { MatheoRMPage} from './pages/MatheoRMPage';
import { SneyderRMPage } from './pages/SneyderRMPage';

export const AppMain = () => {
  return (
    <>
      <div>
        <h1>Hola</h1>
        <StatusGame/>
        <SneyderRMPage/>
        <MatheoRMPage/>
        <LuisRMPage/>
      </div>
    </>
  );
};