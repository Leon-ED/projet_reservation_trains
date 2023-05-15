import { Link } from "react-router-dom"
import { MessageProps } from "../utils/types"

export const MessageComp = (props: MessageProps) => {
    const {titre, message, type,redirectTo,redirectText } = props
    const cssClass = "msg_component " + "msg_"+type
    return (
        <article className={cssClass}>
            <h2>{titre}</h2>
            <p>{message}</p>
            <Link to={redirectTo}>{redirectText}</Link>
        </article>
    )


}