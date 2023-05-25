import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    message: string,
    type: number
}

export const display = ({ message, type }: Props) => {
    switch (type) {
        case 1:
            return toast.success(message)
        case 2:
            return toast.warn(message)
        case 3:
            return toast.error(message)
        default:
            return toast(message)
    }
}
