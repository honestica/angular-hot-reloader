"use strict";
const template = require('./counter.html');

class CounterController {
  /**
   * @param {TodoList} TodoList
   */
  count: number;
  constructor($interval) {
    "ngInject";
    this.count = 0;
    $interval(() => this.increaseCount(), 1000);
  }
  increaseCount() {
    this.count += 1000;
  }
  onAlert() {
    window.alert('you hot swapped the shit out of me !!');
  }
}

export default {
  bindings: {},
  template,
  controller: CounterController
}