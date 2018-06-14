export default class Dropdown {
    constructor(items) {
        this.items = items;
        this.activeClass = 'active';
        // this.initEventHandlers();
        this.render = this.render.bind(this);
    }
    show(item) {
        item.classList.add(this.activeClass);
    }
    hide(item) {
        item.classList.remove(this.activeClass);
    }
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
    render() {
        let dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.innerHTML = '!!!!!!!!!!!';

        return dropdown;
    }
}