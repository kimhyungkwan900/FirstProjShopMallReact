import { Link } from "react-router-dom"

const LinkedButton = ({to, label, className = ''}) => {
    return(
        <Link to={to} className={`text-sm font-medium px-3 py-2 hover:text-blue-500 transition ${className}`}>
            {label}
        </Link>
    )
}

export default LinkedButton;