function Input(props) {
    return <input className="input" type={props.type} id={props.id} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
}

export default Input