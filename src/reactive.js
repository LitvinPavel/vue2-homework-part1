let target = null;

class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

class Reactive extends Dep {
  constructor({ render, ...root }) {
    super();
    this.initData(root);
    this.initWatcher(render);
  }
  initData({ data }) {
    Object.keys(data).forEach((key) => {
      let val = data[key];

      Object.defineProperty(this, key, {
        get() {
          this.depend();
          return val;
        },
        set(newVal) {
          val = newVal;
          this.notify();
        }
      });
    });
  }
  initWatcher(func) {
    target = func.bind(this);
    target();
    target = null;
  }
}

export default Reactive;