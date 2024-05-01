function Label(props) {
    return <label className="label" htmlFor={props.forId}>{props.children}</label>
}

export default Label