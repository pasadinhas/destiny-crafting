function CheckboxItem({ name, description, checked }) {
    return (<div className="checkbox-item">
        <div className={'checkbox ' + (checked ? 'checked' : '')}></div>
        <div className="content">
            <div className='name'>{name}</div>
            <div className='faded'>{description}</div>
        </div>
    </div>)
}

export default CheckboxItem