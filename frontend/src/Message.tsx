type MessageProps = {
    name : string
}

function Message({name} : MessageProps) {
    return <h1>Hello {name} </h1>
}

export default Message;