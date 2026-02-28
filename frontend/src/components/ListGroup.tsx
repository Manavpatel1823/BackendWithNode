

function ListGroup() {
    const items = ["New York", "San Francisco", "Tokyo"];
    return (
        <>
            <h1>hello</h1>
            <ul className="list-group">
                {items.map((item) => <li>{item}</li>)}
            </ul>
        </>
    );
}

export default ListGroup;