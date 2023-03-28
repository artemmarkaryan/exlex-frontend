import {Alert as BAlert} from 'react-bootstrap';

interface Props{
    message: string
    variant: string
}

export const Alert = (props: Props) => {
    if (props.message && props.message.length > 0) {
        return (<BAlert variant={props.variant}>
            <p>Ошибка: {props.message}</p>
        </BAlert>)
    } else {
        return <></>
    }
}
