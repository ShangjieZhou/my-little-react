let states = [];
let rootComponent = null;
let cursor = 0;
const virtualDOM = {
  firstRender: true,
  current: 0,
  newKeys: {},
  oldKeys: {},
};

function mySetState(newVal, stateIndex) {
  // check if re-rendering is necessary
  if (newVal !== states[stateIndex]) {
    states[stateIndex] = newVal;
    reRender();
  }
}

function reRender() {
  cursor = 0;
  virtualDOM.current = 0;
  rootComponent();
  for (const k in virtualDOM.oldKeys) {
    if (!virtualDOM.newKeys[k]) {
      document.body.removeChild(virtualDOM.oldKeys[k]);
    }
  }
  virtualDOM.oldKeys = virtualDOM.newKeys;
  virtualDOM.newKeys = {}
}

function updateDOM(key, ele) {
  if (virtualDOM.firstRender) {
    virtualDOM.oldKeys[key] = ele;
  } else {
    virtualDOM.newKeys[key] = ele;
  }
  virtualDOM.current += 1;
}

// react API =======================================
export function myUseState(initVal) {
  // on first render
  if (states[cursor] == undefined) {
    states[cursor] = initVal;
  }

  const snapshot = cursor;
  cursor += 1;
  return [states[snapshot], (val) => mySetState(val, snapshot)];
}

export function MyReact(component) {
  rootComponent = component;
  // injecting component into DOM in first render
  component();
  virtualDOM.firstRender = false;
}


// components =======================================
export function h1({ text, key }) {
  let element = virtualDOM.oldKeys[key];
  if (element) {
    element.innerText = text;
  } else {
    element = document.createElement("h1");
    element.innerText = text;
    document.body.insertBefore(element, document.body.children[virtualDOM.current]);
  }
  updateDOM(key, element);
}

export function button({ onClick, text, key }) {
  let element = virtualDOM.oldKeys[key];
  if (element) {
    element.onclick = onClick;
    element.innerText = text;
  } else {
    element = document.createElement("button");
    element.onclick = onClick;
    element.innerText = text;
    document.body.insertBefore(element, document.body.children[virtualDOM.current]);
  }
  updateDOM(key, element);
}

export function input({ onChange, value, key }) {
  let element = virtualDOM.oldKeys[key];
  if (element) {
    element.oninput = onChange;
    element.value = value;
  } else {
    element = document.createElement("input");
    element.oninput = onChange;
    element.value = value;
    document.body.insertBefore(element, document.body.children[virtualDOM.current]);
  }
  updateDOM(key, element);
}
