import './css/styles.css';
import 'whatwg-fetch';
import serverJson from '../server/data';
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

// only for demo
const demoContainer = document.createElement('div');
demoContainer.className = 'demo-container';

const clientData = items.map(item => { return { name: item.name } });
const serverData = serverJson.map(item => { return { name: item.name, link: item.link } });

const clientDataContainer = document.createElement('div');
clientDataContainer.textContent = 'client data';
clientDataContainer.className = 'demo-data-container';

const serverDataContainer = document.createElement('div');
serverDataContainer.textContent = 'server data';
serverDataContainer.className = 'demo-data-container';

clientData.forEach(item => {
  const nameElement = document.createElement('div');
  nameElement.className = 'demo-data-container__element';
  nameElement.textContent = `name: ${item.name}`;

  clientDataContainer.appendChild(nameElement);
});

serverData.forEach(item => {
  const nameElement = document.createElement('div');
  nameElement.className = 'demo-data-container__element';
  nameElement.textContent = `name: ${item.name}, link: ${item.link}`;

  serverDataContainer.appendChild(nameElement);
});

demoContainer.appendChild(clientDataContainer);
demoContainer.appendChild(serverDataContainer);

container.appendChild(demoContainer);

const placeHolder1 = 'autoComplete = true, multiSelect = false, useServer = true, showPhoto = true';
const dropdown1 = new Dropdown(items, true, false, true, true, placeHolder1);
container.appendChild(dropdown1.render());

const placeHolder2 = 'autoComplete = false, multiSelect = true, useServer = false, showPhoto = false';
const dropdown2 = new Dropdown(items, false, true, false, false, placeHolder2);
container.appendChild(dropdown2.render());

document.body.appendChild(container);
