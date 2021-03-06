import currentState from "./CurrentState.js";

import images from "./Images.js";
import domUtils from "./DOMUtils.js";
import toolUtils from "./ToolUtils.js";

//the DOM tree of the inspect tool
export default {
  inspectTool: {
    //identifier used for object, id attribute will not be set
    id: "inspectTool",

    //name of element tag
    type: "div",

    //optional, properties that will be set on created element, example: { src: images.image1 }
    properties: {},

    //optional, classes will be set in style attribute
    classes: ["fixed", "backing"],

    //reference to element, will be set on initialization
    element: null,

    //optional
    initialize: (element, x, y, width, height) => {
      element.style.left = x + "px";
      element.style.top = y + "px";
      element.style.width = width + "px";
      element.style.height = height + "px";
    },

    //optional, all child elements
    elements: [
      {
        id: "topBar",
        type: "div",
        classes: ["mainColor", "absolute"],
        initialize: element => {
          element.addEventListener("mousedown", event => {
            toolUtils.startMove(event);
          });
        },
        elements: [
          {
            id: "closeTool",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.closeTool },
            initialize: element => {
              element.addEventListener("mousedown", () => {
                element.style.opacity = "0.5";
              });
              element.addEventListener("mouseup", () => {
                element.style.opacity = "0.7";
              });
              element.addEventListener("click", () => {
                toolUtils.hideTool();
              });
            },
          },
          {
            id: "showTools",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.showTools },
            initialize: element => {
              element.addEventListener("mouseover", () => {
                element.style.opacity = "0.5";
              });
              element.addEventListener("mouseout", () => {
                element.style.opacity = "0.7";
              });
            },
          },
          {
            type: "div",
            classes: ["line"],
            initialize: element => {
              element.style.cssText += `
                width: 1px;
                height: 16px;
                right: 46px;
                top: 5px;
              `;
            },
          },
          {
            type: "div",
            classes: ["line"],
            initialize: element => {
              element.style.cssText += `
                width: 1px;
                height: 16px;
                left: 30px;
                top: 5px;
              `;
            },
          },
          {
            id: "selectElements",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.selectElements },
            initialize: element => {
              element.addEventListener("mouseover", () => {
                element.style.opacity = "0.5";
              });
              element.addEventListener("mouseout", () => {
                element.style.opacity = "0.7";
              });
            },
          },
          {
            id: "tabContainer",
            type: "div",
            classes: ["absolute"],
          },
        ],
      },
      {
        id: "bottomBar",
        type: "div",
        classes: ["mainColor", "absolute"],
        initialize: element => {
          element.addEventListener("mousedown", () => {
            toolUtils.startMove();
          });
        },
        elements: [
          {
            id: "resizeTool",
            type: "img",
            classes: ["absolute"],
            properties: { src: images.resize },
            initialize: element => {
              element.addEventListener("mousedown", event => {
                toolUtils.startResize(event);
              });
            },
          },
        ],
      },
      {
        id: "consoleContainer",
        type: "div",
        elements: [
          {
            id: "consoleResize",
            type: "div",
            initialize: element => {
              element.addEventListener("mousedown", () => {
                toolUtils.startConsoleResize();
              });
            },
            elements: [
              {
                id: "consoleResizeIcon",
                type: "img",
                properties: { src: images.resizeConsole },
              },
            ],
          },
          {
            id: "console",
            type: "div",
          },
        ],
      },
    ],
  },

  tab: {
    type: "div",
    classes: ["tab"],
    initialize: (tab, name, index) => {
      domUtils.createElement(
        {
          type: "p",
          classes: ["tabText"],
          properties: { innerHTML: name },
        },
        [],
        tab,
      );

      domUtils.assignID(tab, "tab:" + name);

      tab.addEventListener("mouseover", () => {
        tab.style.backgroundColor = "#e8e8e8";

        if (currentState.selectedTab !== name) {
          tab.children[0].style.color = "#292929";
          tab.style.borderBottom = "1px solid #e8e8e8";
        }
      });
      tab.addEventListener("mouseout", () => {
        tab.style.backgroundColor = "";

        if (currentState.selectedTab !== name) {
          tab.children[0].style.color = "#737373";
          tab.style.borderBottom = "";
        }
      });

      tab.addEventListener("click", () => {
        toolUtils.switchTabs(name);
      });
    },
  },
};