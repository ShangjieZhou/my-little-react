import { myUseState, MyReact, h1, button, input } from "./myReactPlugin.js";

MyReact(APP);

function APP() {
  const [count, setCount] = myUseState(0);
  const [name, setName] = myUseState("jay");
  const [showName, setShowName] = myUseState(true);

  return [
    h1({
      text: "You have clicked " + count + " times",
      key: "text1"
    }),
    button({
      text: "Increment",
      onClick: () => {
        setCount(count + 1);
      },
      key: "button1"
    }),
    button({
      text: "Reset",
      onClick: () => setCount(0),
      key: "button2",
    }),
    button({
      text: "Toggle Name",
      onClick: () => setShowName(!showName),
      key: "button3",
    }),
    (showName
      ? (h1({
        text: "You are " + name,
        key: "text2"
      }),
        input({
          onChange: (e) => setName(e.target.value),
          value: name,
          key: "input1"
        }))
      : h1({
        text: "Name hidden",
        key: "text3"
      })
    ),
  ]
}