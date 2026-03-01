interface props {
  children: string;
}

import { Children, useState } from "react";

function Btn({ children }: props) {
  const [count, setCount] = useState(0);
  return (
    <>
      <h2>count: {count}</h2>
      <button
        className="btn-class"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {children}
      </button>
    </>
  );
}

export default Btn;
