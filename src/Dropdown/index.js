import '../css/styles.css';
import { findMatch, getData } from '../utils.js';

export class ListItem {
  constructor(id, name, photo, showPhoto, multiSelect, isSelected, selectItem) {
    this.node = document.createElement('div');
    this.node.className = 'list-item';

    this.node.onclick = () => {
      multiSelect ? this.node.classList.toggle('list-item_selected') : selectItem(id);
    }

    if (isSelected) {
      this.node.classList.add('list-item_selected')
    }

    if (showPhoto) {
      const photoElement = document.createElement('img');
      photoElement.alt = name;
      photoElement.src = photo;
      photoElement.className = 'list-item__photo';
      this.node.appendChild(photoElement);
    }

    const nameElement = document.createElement('span');
    nameElement.textContent = name;

    this.node.appendChild(nameElement);

    this.render = this.render.bind(this);
  }

  render() {
    return this.node;
  }
}

export default class Dropdown {
  constructor(items, autoComplete, multiSelect, useServer, showPhoto) {
    this.autoComplete = autoComplete;
    this.multiSelect = multiSelect;
    this.useServer = useServer;
    this.showPhoto = showPhoto;
    this.selectedItem = null;

    this.store = { pendingsRequestsCount : 0 };

    this.node = document.createElement('div');
    this.node.className = 'dropdown';

    this.input = document.createElement('input');

    this.render = this.render.bind(this);
    this.reRenderList = this.reRenderList.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.addItemsToStore = this.addItemsToStore.bind(this);
    this.setItemsToStore = this.setItemsToStore.bind(this);
    this.filterItems = this.filterItems.bind(this);

    this.setItemsToStore(items);

    document.addEventListener('input', this.filterItems, false);
    document.addEventListener('click', this.handleOutsideClick, false);

    this.render(items);
  }

  addItemsToStore(items) {
    if (items && items.length) {
      this.reRenderList(this.showingItems.concat(items));
    }
  }

  setItemsToStore(items) {
    this.store.items = items;

    this.reRenderList(items);
  }

  selectItem(id) {
    this.selectedItem = id;

    this.reRenderList(this.store.items);
  }

  filterItems(e) {
    const filteredItems = e.target.value ? findMatch(this.store.items, e.target.value) : this.store.items;

    this.reRenderList(filteredItems);

    if (this.useServer) {
      this.store.pendingsRequestsCount ++;

      getData(e.target.value).then(serverItems => {
        this.store.pendingsRequestsCount --;

        /* так как мы не можем абортить промисы, просто не сэтим данные из устаревших */
        return serverItems && !this.store.pendingsRequestsCount ? this.addItemsToStore(serverItems) : null
      });
    }
  }

  handleOutsideClick(e) {
    if (!this.node.contains(e.target)) {
      this.list.classList.remove('dropdown__list_shown')
    }
  }

  reRenderList(items) {
    if (!this.list) {
      return;
    }

    while(this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }

    this.showingItems = items || this.store.items;

    this.showingItems.map(item => {
      const wrapper = document.createElement('div');

      wrapper.appendChild((new ListItem(item.id, item.name, item.photo, this.showPhoto, this.multiSelect, item.id === this.selectedItem, this.selectItem)).render());

      this.list.appendChild(wrapper);
    });

    if (!this.list.hasChildNodes()) {
      const nothingToShowMessage = document.createElement('div');
      nothingToShowMessage.textContent = 'nothing to show';

      this.list.appendChild(nothingToShowMessage);
    }

    this.node.appendChild(this.list);
  }

  render(items) {
    this.input.type = 'text';
    this.input.className = 'dropdown__input';
    this.input.placeholder = 'type here';

    if (this.list) {
      this.input.onclick = () => this.list.classList.add('dropdown__list_shown');
    }

    /*
    * Решение прокидывать знание о мультиселектности в сами айтемы у меня вызывает боль.
    * Однако хранить в дропдауне при мультиселекте список всех выбранных айтемов, удалять их тоже так себе идея,
    * хотя архитектурно более правильная. Может зафигачить какую-нибудь клевую структуру данных?
     */

    this.list = document.createElement('div');
    this.list.className = 'dropdown__list';

    this.showingItems = items || this.store.items;

    this.showingItems.map(item => {
      const wrapper = document.createElement('div');

      wrapper.appendChild((new ListItem(item.id, item.name, item.photo, this.showPhoto, this.multiSelect, item.id === this.selectedItem, this.selectItem)).render());

      this.list.appendChild(wrapper);
    });

    this.node.appendChild(this.input);
    this.node.appendChild(this.list);

    return this.node;
  }
}