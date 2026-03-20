import './style.css';
import App from './app';
import renderApp from './dom';
import { loadApp } from './storage';

const app = loadApp(App);

renderApp(app);