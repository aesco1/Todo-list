import './styles.css';
import {Sidebar} from './modules/populateSide.js'
import {HomePage} from './modules/populateHomepage.js'

console.log('Hello from webpack!');

const sidebarElement = document.getElementById('sidebar');
const sidebarInstance = new Sidebar();
sidebarElement.append(sidebarInstance.render());

const homePageElement = document.getElementById('content');
const homePageInstance = new HomePage();
homePageElement.append(homePageInstance.render());