import './styles.css';
import {Sidebar} from './modules/populateSide.js'

console.log('Hello from webpack!');

const sidebarElement = document.getElementById('sidebar');
const sidebarInstance = new Sidebar();
sidebarElement.append(sidebarInstance.render());
