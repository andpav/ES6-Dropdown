import '../css/styles.css';

export default class Dropdown {
  constructor(items) {
    this.items = items;

    this.node = document.createElement('div');
    this.node.className = 'dropdown';

    this.input = document.createElement('input');

    this.list = document.createElement('div');
    this.list.className = 'dropdown__list';

    // this.initEventHandlers();
    this.add = this.add.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
    this.render = this.render.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    document.addEventListener('click', this.handleOutsideClick, false);
  }
  // show(item) {
  //     item.classList.add(this.activeClass);
  // }
  // hide(item) {
  //     item.classList.remove(this.activeClass);
  // }
  // initEventHandlers() {
  //     const _this = this;
  //
  //     for (let i = 0, len = this.items.length; i < len; i += 1) {
  //         const item = this.items[i];
  //
  //         item.addEventListener('click', function(e) {
  //             e.preventDefault();
  //             if (this.classList.contains(_this.activeClass)) {
  //                 _this.hide(this);
  //             } else {
  //                 _this.show(this);
  //             }
  //         });
  //     }
  // }
 handleOutsideClick(className) {
    this.classList.add(className);
  }
  add(className) {
    this.classList.add(className);
  }
  hide(className) {
    this.classList.remove(className);
  }

  toggle(className) {
    this.classList.toggle(className);
  }

  handleOutsideClick(e) {
    if (!this.node.contains(e.target)) {
      this.list.classList.remove('dropdown__list_shown')
    }
  }

  render() {
    this.input.type = 'text';
    this.input.className = 'dropdown__input';
    this.input.onclick = () => this.list.classList.add('dropdown__list_shown');

    this.node.appendChild(this.input)
    this.node.appendChild(this.list)

    return this.node;
  }
}