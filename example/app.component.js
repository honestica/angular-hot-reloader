import './app.less';
import template from './app.html';

export class AppController {
  /**
   * @param {TodoList} TodoList
   */
  constructor(TodoList) {
    "ngInject";
    this.todos = TodoList;
  }

  onSave(task) {
    if (!task) return;

    this.todos.add(task);
  }

  onFilter(state) {
    switch (state) {
      case 'all':
        this.todos.showAll();
        break;
      case 'active':
        this.todos.showActive();
        break;
      case 'completed':
        this.todos.showCompleted();
        break;
    }
  }

  onToggleAll() {
    this.todos.toggleAll();
  }
}

export default {
  template,
  controller: AppController
};
