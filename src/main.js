import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
} from "snabbdom";
import "./assets/css/style.css";
import App from "./app";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

let vnode = null;

function render(_vnode) {
  vnode = patch(vnode, _vnode);
}
App.$render = render;

let app = document.querySelector("#app");
vnode =  patch(app, App.view());
