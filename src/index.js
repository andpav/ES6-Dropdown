import './css/styles.css';
import './normalize.js';
import Dropdown from './Dropdown/index';

let container = document.createElement('div');
container.className = 'container';

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

const placeHolder1 = 'autoComplete = true, multiSelect = false, useServer = true, showPhoto = true';
container.appendChild((new Dropdown(items, true, false, true, true, placeHolder1)).render());

const placeHolder2 = 'autoComplete = false, multiSelect = true, useServer = false, showPhoto = false';
container.appendChild((new Dropdown(items, false, true, false, false, placeHolder2)).render());

document.body.appendChild(container);