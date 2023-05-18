type Props = {
    id: number;
    name: string;
    description: string;
    className?: string;
}

const ClientItem = ({ id, name, description, className }: Props) => {
    return (
        <div>
            <li key={id} className={`${className}`}>
                <p className="text-center">{name}</p>
                <p className="text-center">{description}</p>
            </li>
        </div>
    )
}

export default ClientItem;