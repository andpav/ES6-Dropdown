import './css/styles.css';
import 'whatwg-fetch';
import Dropdown from './Dropdown/index';

const container = document.createElement('div');
container.className = 'container';

const items = [
  {
    id: '1',
    name: 'Vasily Slonikhin',
    photo: 'src/assets/pic1.jpg',
  },
  {
    id: '2',
    name: 'Ivan Molotov',
    photo: 'src/assets/pic2.jpg',
  },
  {
    id: '3',
    name: 'Boris the Blade',
    photo: 'src/assets/pic3.jpg',
  },
  {
    id: '4',
    name: 'Andrey Rogozov',
    photo: 'src/assets/pic4.jpg',
  },
];

const placeHolder1 = 'autoComplete = true, multiSelect = false, useServer = true, showPhoto = true';
const dropdown1 = new Dropdown(items, true, false, true, true, placeHolder1);
container.appendChild(dropdown1.render());

const placeHolder2 = 'autoComplete = false, multiSelect = true, useServer = false, showPhoto = false';
const dropdown2 = new Dropdown(items, false, true, false, false, placeHolder2);
container.appendChild(dropdown2.render());

document.body.appendChild(container);
