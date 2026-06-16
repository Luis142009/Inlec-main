import React from 'react';
import { StatusGame } from './components/StatusGame';
import LuisRMPage from "./pages/LuisRMPage";
import { MatheoRMPage} from './pages/MatheoRMPage';
import InterfazCap from "./pages/interfazcap";
import { Reproductorluis } from './pages/Reproductorluis';
import { Reproductors } from './components/Reproductors';
import {SneyderRMPage} from "./pages/SneyderRMPage";
import { LuisPlugin } from "./components/LuisPlugin";
import { LotMatheo } from './components/LotMatheo';
import { Lottiestiven } from './components/Lotiestiven';



export const AppMain = () => {
  return (
    <>
      <div>
       <LuisPlugin />
      </div>
    </>
  );
};