let start;

//inspect tool element object stored in navigator.__InspectToolReferenceObject__

//called when bookmark is clicked
(start = () => {
  if (navigator.__InspectToolReferenceObject__) {
    const tool = navigator.__InspectToolReferenceObject__;

    if (tool.style.display === "none") {
      tool.style.display = "block";
    } else {
      tool.style.display = "none";
    }
  } else {
    import("/src/Main.js");
  }
})();

const request = fetch("dist/main.js", { cache: "no-store" });
request.then(contents => contents.text()).then(script => {
  newLink.setAttribute("href", `javascript:(${start.toString().replace(`import("/src/Main.js");`, `(()=>{${script}})()`)})()`);
});

newButton.onclick = start;