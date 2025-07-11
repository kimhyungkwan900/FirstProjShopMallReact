import { Link } from "react-router-dom"

const LinkedButton = ({to, label, className = ''}) => {
    return(
        <Link to={to} className={className ? className : 'text-sm font-medium px-3 py-2 hover:text-blue-500 transition'}>
            {label}
        </Link>
    )
}

export default LinkedButton;