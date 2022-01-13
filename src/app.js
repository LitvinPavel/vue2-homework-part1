import { h } from "snabbdom";
import usersApi from "./api/users";

function add() {
  this.lastId++;
  this.list = [...this.list, {
    id: this.lastId,
    name: `test_name_${this.lastId}`,
    description: "test_description",
    imgUrl: this.list[0].imgUrl
  }]
}

function remove(id) {
  this.list = this.list.filter(user => user.id !== id);
}

export default {
  data: {
    list: [],
    lastId: 1
  },
  async fetchData() {
    this.list = await usersApi.getList();
    this.lastId = this.list[this.list.length - 1].id
  },
  template() {

    return h("main.main", [
      h("div.btn-group", [
        h("button", { on: { click: add.bind(this) } }, "Добавить"),
      ]),
      h("div.container", [
        h(
          "div",
          this.list.map(({
            name,
            description,
            imgUrl,
            id
          }) => {
            return h(
              "section.list-item",
              { key: id },
              [
                h("img.list-item-img", {
                  props: {
                    src: imgUrl
                  }
                }),

                h("div.list-item-content", [
                  h(
                    "h4.list-item-title",
                    name
                  ),
                  h(
                    "p.list-item-description",
                    description
                  ),
                  h("button", { on: { click: remove.bind(this, id) } }, "Удалить")
                ])
              ]
            );
          })
        )
      ])
    ])
  }
}