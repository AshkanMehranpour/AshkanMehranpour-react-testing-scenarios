import { useEffect, useState } from "react";

const fetchColors = () => {
  return Promise.resolve(["red", "green", "blue"]);
};

const LoadableColorList = () => {
  const [colorLists, setColorLists] = useState();

  useEffect(() => {
    fetchColors().then((list) => setColorLists(list));
  }, []);

  return (
    <ul>
      {colorLists?.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ul>
  );
};

export default LoadableColorList;
