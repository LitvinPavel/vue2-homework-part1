import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
} from "snabbdom";
import "./assets/css/style.css";
import App from "./app";
import usersApi from "./api/users";

import Reactive from './reactive.js'

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const fetchData = async () => {
  const list = await usersApi.getList();
  return list;
}

let vnode = document.querySelector("#app");

const vm = new Reactive({
  data: {
    list: [],
    lastId: 1
  },
  render() {
    vnode = patch(vnode, App.template.bind(this)());
  }
});

vm.init = async function () {
  this.list = await fetchData();
  this.lastId = this.list[this.list.length - 1].id
}

vm.init();
