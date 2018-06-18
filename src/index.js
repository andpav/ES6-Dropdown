import './css/styles.css';
import Dropdown from './Dropdown/index';

let container = document.createElement('div');

const items = [
  {
    id : '1',
    name : 'Vasily Slonikhin',
    photo : 'src/assets/pic1.jpg',
  },
  {
    id : '2',
    name : 'Ivan Molotov',
    photo : 'src/assets/pic2.jpg',
  },
  {
    id : '3',
    name : 'Boris the Blade',
    photo : 'src/assets/pic3.jpg',
  },
  {
    id : '4',
    name : 'Andrey Rogozov',
    photo : 'src/assets/pic4.jpg',
  },
];

const autoComplete = false;
const multiSelect = false;
const useServer = true;
const showPhoto = true;

container.className = 'container';
container.appendChild((new Dropdown(items, autoComplete, multiSelect, useServer, showPhoto)).render());

document.body.appendChild(container);