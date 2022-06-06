import Ls from './Ls.js';
import * as globals from './globals.js';
import RemoveItems from './Remove.js';

class Complete {
  Ls = new Ls();

  RemoveItems = new RemoveItems();

  clearCompleted = () => {
    const completed = [...document.querySelectorAll(`.${globals.TASK_LIST_ITEM}`)];
    completed.filter((el) => {
      if (el.classList.contains(globals.TASK_LIST_COMPLETED)) {
        this.RemoveItems.removeItem(el);
      }
      return el;
    });
  };

  taskComplete = (parent, id) => {
    const list = this.Ls.getFromLS();
    list.map((el) => {
      if (Number(id) === el.index) {
        if (el.completed === true) {
          parent.classList.remove(globals.TASK_LIST_COMPLETED);
          el.completed = false;
        } else {
          parent.classList.add(globals.TASK_LIST_COMPLETED);
          el.completed = true;
        }
      }
      return el;
    });
    this.Ls.addToLS(list);
  };
}

export default Complete;