import { Notification } from "electron"

type Props = {
    title: string,
    body: string
}

export const display = ({ title, body }: Props) => {
    return new Notification({
        title: title,
        body: body
    }).show()
}
