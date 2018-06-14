import './css/styles.css';
import Dropdown from './Dropdown/index';

let container = document.createElement('div');

container.className = 'container';
container.appendChild((new Dropdown).render());

document.body.appendChild(container);