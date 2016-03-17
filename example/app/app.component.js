import './app.less';
import template from './app.html';

export class AppController {
  /**
   * @param {TodoList} TodoList
   */
  constructor(TodoList, $interval) {
    "ngInject";
    this.todos = TodoList;
    this.count = 0;
    $interval(() => this.increaseCount(), 1000);
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

  increaseCount() {
    this.count += 100;
  }
}

export default {
  template,
  controller: AppController
};
