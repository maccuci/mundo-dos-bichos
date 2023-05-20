type Props = {
    id: number;
    name: string;
    description: string;
    action?: ClientAction;
    className?: string;
}

const ClientItem = ({id, name, description, action, className}: Props) => {
    const handleAction = (action: ClientAction | undefined) => {
        switch (action) {
            case ClientAction.CREATE:
                break;
            case ClientAction.UPDATE:
                break;
            case ClientAction.DELETE:
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <li key={id} className={`${className}`}>
                <p className="text-center">{name}</p>
                <p className="text-center">{description}</p>
                <button onClick={() => handleAction(action)}></button>
            </li>
        </div>
    )
}

export default ClientItem;
