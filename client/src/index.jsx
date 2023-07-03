import React from 'react';
import {createRoot} from 'react-dom/client';
import RouterComponent from "./Pages/RouterComponent";
import {disableReactDevTools} from "./disableReactDevTools"


if (process.env.NODE_ENV === "production") disableReactDevTools();

const rootElem = document.getElementById('root');
const root = createRoot(rootElem);

root.render(
    <RouterComponent/>
);
