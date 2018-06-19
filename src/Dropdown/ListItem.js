import '../css/styles.css';

export default class ListItem {
  constructor(id, name, photo, showPhoto, multiSelect, isSelected, selectItem) {
    this.node = document.createElement('div');
    this.node.className = 'list-item';

    this.node.onclick = () => {
      if (multiSelect) {
        this.node.classList.toggle('list-item_selected');

        return;
      }

      selectItem(id);
    };

    if (isSelected) {
      this.node.classList.add('list-item_selected');
    }

    if (showPhoto) {
      const photoElement = document.createElement('img');

      photoElement.alt = name;
      photoElement.src = photo;
      photoElement.className = 'list-item__photo';

      this.node.appendChild(photoElement);
    }

    const nameElement = document.createElement('div');
    nameElement.className = 'list-item__name';
    nameElement.textContent = name;

    this.node.appendChild(nameElement);

    this.render = this.render.bind(this);
  }

  render() {
    return this.node;
  }
}
