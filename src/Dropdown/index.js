import '../css/styles.css';

export default class Dropdown {
  constructor(items) {
    this.items = items;
    this.activeClass = 'dropdown_active';

    this.node = document.createElement('div');
    this.node.className = 'dropdown';

    this.input = document.createElement('input');

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
      this.node.classList.remove('dropdown_active')
    }
  }

  render() {
    this.input.type = 'text';
    this.input.onclick = () => this.node.classList.add('dropdown_active');

    this.node.appendChild(this.input)

    return this.node;
  }
}