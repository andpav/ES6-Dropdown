import './css/styles.css';
import Dropdown from './Dropdown/index';

let container = document.createElement('div');

const items = [
  {
    id : '1',
    name : 'Vasily Slonikhin',
    photo : '...',
  },
  {
    id : '2',
    name : 'Ivan Molotov',
    photo : '...',
  },
  {
    id : '3',
    name : 'Boris the Blade',
    photo : '...',
  },
];

const autoComplete = false;
const multiSelect = false;
const useServer = false;
const showPhoto = false;

container.className = 'container';
container.appendChild((new Dropdown(items, autoComplete, multiSelect, useServer, showPhoto)).render());

document.body.appendChild(container);