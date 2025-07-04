import { Link } from "react-router-dom"

const LinkedButton = ({to, lable, className = ''}) => {
    return(
        <Link to={to} className={`text-sm font-medium px-3 py-2 hover:text-blue-500 transition ${className}`}>
            {lable}
        </Link>
    )
}

export default LinkedButton;