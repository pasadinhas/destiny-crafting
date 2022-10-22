function MultiItem({children, span}) {
    return <li className="multi-item span-n" style={{'--n': span}}>
        <ul className="list">
            {children}
        </ul>
    </li>
}

export default MultiItem