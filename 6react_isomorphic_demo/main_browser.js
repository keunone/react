import React from 'react';
import { render } from 'react-dom';
import AppComponent from './components';

// 把根组件渲染到 DOM 树上
const { initalData } = window
console.log('window initalData', initalData)
render(<AppComponent {...initalData}/>, window.document.getElementById('app'));
