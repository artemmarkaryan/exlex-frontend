import {Alert as BAlert} from 'react-bootstrap';

export const Alert = (props: any) => {
    if (props.message && props.message.length > 0) {
        return (<BAlert variant={props.variant}>
            <p>Ошибка: {props.message}</p>
        </BAlert>)
    } else {
        return <></>
    }
}
