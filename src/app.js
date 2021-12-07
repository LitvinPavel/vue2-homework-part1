import { h } from "snabbdom";
import usersApi from "./api/users";


export default {
  data: [],
  async fetchData() {
    this.data = await usersApi.getList();
    this.$render(this.view());
  },
  view() {
    return h("main.main", {
      hook: {
        create: () => this.fetchData()
      }
    }, [
      h("div.container", [
        h(
          "div",
          this.data.map(({
            name,
            description,
            imgUrl
          }) => {
            return h(
              "section.list-item",
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
                  )
                ])
              ]
            );
          })
        )
      ])
    ]);
  }
}