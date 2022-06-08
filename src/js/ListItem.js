import LocalStorage from './LocalStorage.js';
import Complete from './Complete.js';
import RemoveItems from './Remove.js';

class ListItem extends LocalStorage {
  list = [];

  Complete = new Complete();

  RemoveItems = new RemoveItems();

  toggleIcons = (cls, ...ico) => {
    ico.forEach((el) => {
      el.classList.toggle(cls);
    });
  };

  edit = (e) => {
    const numId = e.currentTarget.id.replace('task-', '');

    const dragIco = e.currentTarget.querySelector('.dragndrop-ico');
    const trashIco = e.currentTarget.querySelector('.trash-ico');
    this.list = this.getFromLS();

    trashIco.currentParentEl = e.currentTarget;
    trashIco.currentParentId = numId;
    trashIco.addEventListener('click', (e) => {
      this.RemoveItems.removeItem(e.target);
    });
    if (e.target.classList.contains('list-desc')) {
      e.currentTarget.style.backgroundColor = '#ccc';
      const descText = e.target.innerText;
      e.target.parentNode.innerHTML = `<input type='text' class='list-desc-edit' value='${descText}'>
      <span class="edit-item-prompt">Click input to save</span>
      `;

      const tempInput = e.currentTarget.querySelector('.list-desc-edit');
      const endOfText = tempInput.value.length;
      tempInput.setSelectionRange(endOfText, endOfText);
      tempInput.focus();
      this.toggleIcons('hide', dragIco, trashIco);
    }

    if (e.target.classList.contains('list-desc-edit')) {
      e.currentTarget.style.backgroundColor = 'unset';
      const descText = e.target.value;
      this.list.map((el) => {
        if (el.index === Number(numId)) {
          el.desc = descText;
        }
        return el;
      });

      e.target.parentNode.innerHTML = `<span class="list-desc">${descText}</span>`;
      this.addToLS(this.list);
      this.toggleIcons('hide', dragIco, trashIco);
    }
  };

  listItemEvent = (list, id) => {
    const listItem = document.querySelector(`#task-${id}.task-list-item`);
    listItem.addEventListener('click', this.edit);
    const checkbox = listItem.querySelector('.tdl-checkbox');
    checkbox.addEventListener('change', () => {
      this.Complete.taskComplete(listItem, id);
    });
  };

  listItemEvents = (list) => {
    const listItems = document.querySelectorAll('.task-list-item');

    listItems.forEach((el) => {
      el.toggleEv = 0;
      el.addEventListener('click', this.edit);
    });

    const checkbox = document.querySelectorAll('.tdl-checkbox');
    checkbox.forEach((el) => {
      el.addEventListener('change', (e) => {
        const parent = e.target.closest('.task-list-item');
        const id = parent.id.replace('task-', '');
        this.Complete.taskComplete(parent, id, list);
      });
    });
  };
}

export default ListItem;