import angular from 'angular';

import todoTextInput from './todo_text_input/todo_text_input';

import todoItemComponent from './todo_item/todo_item.component';
import counterComponent from './counter/counter.component';
import todoFooterComponent from './todo_footer/todo_footer.component';
import todoBatchToggle from './todo_batch_toggle/todo_batch_toggle.component';
import todoListFilter from './todo_list_filter/todo_list_filter.component';

export default angular
  .module('app.components', [
    todoTextInput.name
  ])
  .component('todoItem', todoItemComponent)
  .component('counter', counterComponent)
  .component('todoFooter', todoFooterComponent)
  .component('todoBatchToggle', todoBatchToggle)
  .component('todoListFilter', todoListFilter)
;
