import { useState } from "react";

// Preparazione del local storage, come visto a lezione ho preso spunto dal progetto del mio professore.

export default function (key, defaultValue) {
  const oldValue = localStorage.getItem(key);

  const [state, setState] = useState(
    oldValue !== null ? JSON.parse(oldValue) : defaultValue
  );

  const changeState = (newValue) => {
    setState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [state, changeState];
}
