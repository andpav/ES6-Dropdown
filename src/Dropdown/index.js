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
    this.autoComplete = autoComplete;
    this.multiSelect = multiSelect;
    this.showPhoto = showPhoto;
    this.selectedItem = null;

    this.store = {};

    this.node = document.createElement('div');
    this.node.className = 'dropdown';

    this.input = document.createElement('input');

    this.render = this.render.bind(this);
    this.reRenderList = this.reRenderList.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.setItemsToStore = this.setItemsToStore.bind(this);
    this.filterItems = this.filterItems.bind(this);

    this.setItemsToStore(items);

    document.addEventListener('input', this.filterItems, false);
    document.addEventListener('click', this.handleOutsideClick, false);

    this.render(items);
  }

  addItemsToStore(items) {
    this.store.items = Object.assign({}, this.store.items, items);

    this.reRenderList(items);
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
    // ex.: sinits -> ьштшеы
    const enToRuKeyboardtranslator = {
      'q':'й', 'w':'ц', 'e':'у', 'r':'к', 't':'е', 'y':'н', 'u':'г',
      'i':'ш', 'o':'щ', 'p':'з', '[':'х', ']':'ъ', 'a':'ф', 's':'ы',
      'd':'в', 'f':'а', 'g':'п', 'h':'р', 'j':'о', 'k':'л', 'l':'д',
      ';':'ж', '\'':'э', '\\':'ё', 'z':'я', 'x':'ч', 'c':'с', 'v':'м', 'b':'и',
      'n':'т', 'm':'ь', ',':'б', '.':'ю',
  };

    // ex.: синиц -> cbybw
    const ruToEnKeyboardtranslator = {
      'й':'q', 'ц':'w', 'у':'e', 'к':'r', 'е':'t', 'н':'y', 'г':'u',
      'ш':'i', 'щ':'o', 'з':'p', 'х':'[', 'ъ':']', 'ф':'a', 'ы':'s',
      'в':'d', 'а':'f', 'п':'g', 'р':'h', 'о':'j', 'л':'k', 'д':'l',
      'ж':';', 'э':'\'', 'ё':'//', 'я':'z', 'ч':'x', 'с':'c', 'м':'v', 'и':'b',
      'т':'n', 'ь':'m', 'б':',', 'ю':'.',
    };

    // sinits -> синиц
    const enToRuPronounceTranslator = {
      'a': 'а', 'b': 'б', 'c': 'к', 'd': 'д', 'e': 'и', 'f': 'ф', 'g': 'г', 'h': 'х', 'i': 'и', 'j': 'дж', 'k': 'к',
      'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п', 'q': 'к', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'v': 'в',
      'w': 'в', 'x': 'кс', 'y': 'a', 'z': 'з',
    };

    // синиц -> sinits
    const ruToEnPronounceTranslator = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'i',
      'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
      'х': 'h', 'ц': 'ts', 'ч': 'tch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'i', 'ь': '', 'э': 'e', 'ю': 'iy', 'я': 'ia',
    };

    const filteredItems = this.store.items.filter(item => ~item.name.indexOf(e.target.value));

    this.reRenderList(filteredItems);
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

    const showingItems = items || this.store.items;

    showingItems.map(item => {
      const wrapper = document.createElement('div');

      wrapper.appendChild((new ListItem(item.id, item.name, item.photo, this.showPhoto, this.multiSelect, item.id === this.selectedItem, this.selectItem)).render());

      this.list.appendChild(wrapper);
    });

    this.node.appendChild(this.list);
  }

  render(items) {
    this.input.type = 'text';
    this.input.className = 'dropdown__input';

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

    const showingItems = items || this.store.items;

    showingItems.map(item => {
      const wrapper = document.createElement('div');

      wrapper.appendChild((new ListItem(item.id, item.name, item.photo, this.showPhoto, this.multiSelect, item.id === this.selectedItem, this.selectItem)).render());

      this.list.appendChild(wrapper);
    });

    this.node.appendChild(this.input);
    this.node.appendChild(this.list);

    return this.node;
  }
}