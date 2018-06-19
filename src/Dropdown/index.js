import ListItem from './ListItem'
import { findMatch, getData } from '../helper/utils';
import '../css/styles.css';

export default class Dropdown {
  constructor(items, autoComplete, multiSelect, useServer, showPhoto, placeholder) {
    this.autoComplete = autoComplete;
    this.multiSelect = multiSelect;
    this.useServer = useServer;
    this.showPhoto = showPhoto;
    this.selectedItem = null;

    this.store = { pendingsRequestsCount: 0 };

    this.node = document.createElement('div');
    this.node.className = 'dropdown';

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'dropdown__input';
    this.input.placeholder = placeholder;

    this.render = this.render.bind(this);
    this.renderList = this.renderList.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.addItemsToStore = this.addItemsToStore.bind(this);
    this.setItemsToStore = this.setItemsToStore.bind(this);
    this.filterItems = this.filterItems.bind(this);

    document.addEventListener('input', this.filterItems, false);
    document.addEventListener('click', this.handleOutsideClick, false);

    this.setItemsToStore(items);
  }

  addItemsToStore(items) {
    if (items && items.length) {
      this.renderList(this.showingItems.concat(items));
    }
  }

  setItemsToStore(items) {
    this.store.items = items;

    this.renderList(items);
  }

  selectItem(id) {
    this.selectedItem = id;

    this.renderList(this.store.items);
  }

  filterItems(e) {
    const filteredItems = e.target.value ?
      findMatch(this.autoComplete, this.store.items, e.target.value) :
      this.store.items;

    this.renderList(filteredItems);

    if (this.useServer) {
      this.store.pendingsRequestsCount++;

      getData(e.target.value).then(serverItems => {
        this.store.pendingsRequestsCount--;

        /* так как мы не можем абортить промисы, просто не сэтим данные из устаревших */
        return serverItems && !this.store.pendingsRequestsCount ? this.addItemsToStore(serverItems) : null;
      });
    }
  }

  handleOutsideClick(e) {
    if (!this.node.contains(e.target)) {
      this.list.classList.remove('dropdown__list_shown');
    }
  }

  renderList(items) {
    if (!this.list) {
      return;
    }

    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }

    this.showingItems = items || this.store.items;

    /*
    * Решение прокидывать знание о мультиселектности в сами айтемы у меня вызывает боль.
    * Однако другой вариант - хранить в дропдауне при мультиселекте список всех выбранных айтемов,
    * удалять их, перерисовки от каждого выбранного элемента (кейс мультиселекта) - это все плохо,
    * хотя архитектурно более правильно.
     */

    this.showingItems.map(item => {
      const wrapper = document.createElement('div');

      wrapper.appendChild((new ListItem(
        item.id,
        item.name,
        item.photo,
        this.showPhoto,
        this.multiSelect,
        item.id === this.selectedItem,
        this.selectItem,
      )).render());

      this.list.appendChild(wrapper);
    });

    if (!this.list.hasChildNodes()) {
      const nothingToShowMessage = document.createElement('div');
      nothingToShowMessage.textContent = 'nothing to show';

      this.list.appendChild(nothingToShowMessage);
    }

    this.node.appendChild(this.list);
  }

  render() {
    this.list = document.createElement('div');
    this.list.className = 'dropdown__list';

    this.input.onclick = () => this.list.classList.add('dropdown__list_shown');

    this.node.appendChild(this.input);

    this.renderList(this.store.items);

    return this.node;
  }
}
