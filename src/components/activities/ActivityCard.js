function ActivityCard({children, name, description}) {
    return <li className="activity card">
        <div className="title">
            <div className="name">{name}</div>
            <div className="faded">{description}</div>
        </div>
        {children}
    </li>
}

export default ActivityCard