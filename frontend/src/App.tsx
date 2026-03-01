import Message from "./Message";
import ListGroup from "./components/ListGroup";
import Btn from "./components/ButtonCounter";

const handleSelect = (item: string) => {
  console.log(item);
};

function App() {
  let items = ["New York", "San Francisco", "San Jose", "Dallas"];
  return (
    <div>
      <ListGroup items={items} heading="Cities" onSelected={handleSelect} />
      <Btn>My Button</Btn>
    </div>
  );
}

export default App;
