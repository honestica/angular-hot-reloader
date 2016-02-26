import './app.less';
import template from './app.html';

export class TodoAppController {
  /**
   * @param {TodoList} todoList
   */
  constructor(todoList) {
    "ngInject";
    this.todos = todoList;
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
  controller: TodoAppController
};
