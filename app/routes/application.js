import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { hash } from "rsvp";

export default class ApplicationRoute extends Route {
  async model() {
    // console.log(this.store);
    this.store.push({
      data: {
        id: "1",
        type: "inspection",
        attributes: {
          name: "Some inspection",
        },
        relationships: {
          document: {
            data: {
              type: "ref:document",
              id: "ref:document:5",
            },
          },
        },
      },
      included: [
        {
          id: "ref:document:4",
          type: "ref:document",
          attributes: {
            prop1: {
              lang: "en",
              chair: {
                name: "alberto",
              },
              table: [1, 2, 3, 4, 5],
            },
          },
        },
        {
          id: "ref:document:5",
          type: "ref:document",
          attributes: {
            property_1: 5,
            property_2: 6,
            extras: ["ref:document:5:property_1", "ref:document:5:property_2"],
            parent: "EDM:inspection:1",
            meta: {
              property_1: [
                {
                  coordinates: {
                    lat: 1213,
                    lng: 1211,
                  },
                  timestamp: "2020/10/15T12:30:12",
                },
              ],
              property_2: [
                {
                  coordinates: {
                    lat: 1213,
                    lng: 1211,
                  },
                  timestamp: "2020/10/15T12:30:12",
                },
              ],
            },
          },
        },
        {
          type: "ref:extra",
          id: "ref:document:5:property_1",
          attributes: {
            images: ["url"],
            score: 1,
            failed: false,
            notes: "Vi esto y no me gustó",
            actions: ["EDM:action:1"],
          },
        },
        {
          type: "ref:extra",
          id: "ref:document:5:property_2",
          attributes: {
            images: ["url"],
            score: 1,
            failed: false,
            notes: "Vi esto y no me gustó",
            actions: ["EDM:action:1"],
          },
        },
        {
          type: "action",
          id: "1",
          attributes: {
            name: "Alberto",
          },
          relationships: {
            extras: {
              data: [
                {
                  type: "ref:extra",
                  id: "ref:document:5:property_2",
                },
                {
                  type: "ref:extra",
                  id: "ref:document:5:property_1",
                },
              ],
            },
          },
        },
      ],
    });

    return this.store.peekRecord("inspection", 1);
  }
}
