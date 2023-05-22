
type Props = {
    id: number;
    name: string;
    service?: string;
    className?: string;
}

const ClientItem = ({id, name, service, className}: Props) => {
    return (
        <div>
            <li key={id} className={`${className}`}>
                <p className="text-center">{name}</p>
                <p className="text-center">{service}</p>
            </li>
        </div>
    )
}

export default ClientItem;
