import '../css/styles.css';

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
      const photoElement = document.createElement('div');
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
    this.items = items;
    this.autoComplete = autoComplete;
    this.multiSelect = multiSelect;
    this.showPhoto = showPhoto;
    this.selectedItem = null;

    this.node = document.createElement('div');
    this.node.className = 'dropdown';

    this.input = document.createElement('input');

    this.render = this.render.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.selectItem = this.selectItem.bind(this);

    document.addEventListener('click', this.handleOutsideClick, false);
  }

  selectItem(id) {
    this.selectedItem = id;

    this.render();
  }

  handleOutsideClick(e) {
    if (!this.node.contains(e.target)) {
      this.list.classList.remove('dropdown__list_shown')
    }
  }

  render() {
    if (this.list) {
      this.node.removeChild(this.list);
    }

    this.input.type = 'text';
    this.input.className = 'dropdown__input';
    this.input.onclick = () => this.list.classList.add('dropdown__list_shown');

    /*
    * Решение прокидывать знание о мультиселектности в сами айтемы у меня вызывает боль.
    * Однако хранить в дропдауне при мультиселекте список всех выбранных айтемов, удалять их тоже так себе идея,
    * хотя архитектурно более правильная. Может зафигачить какую-нибудь клевую структуру данных?
     */

    this.list = document.createElement('div');
    this.list.className = 'dropdown__list';
    this.items.map(item => {
      const wrapper = document.createElement('div');

      wrapper.appendChild((new ListItem(item.id, item.name, item.photo, this.showPhoto, this.multiSelect, item.id === this.selectedItem, this.selectItem)).render());

      this.list.appendChild(wrapper);
    });

    this.node.appendChild(this.input);
    this.node.appendChild(this.list);

    return this.node;
  }
}