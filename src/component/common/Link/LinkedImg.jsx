import { Link } from "react-router-dom";

const LinkedImg = ({ to, src, alt = "", className = "", width, height }) => {
    return (
        <Link to={to}>
            <img
                src={src} alt={alt} width={width} height={height} className={`transition hover:opacity-80 ${className}`}
            />
        </Link>
    );
};

export default LinkedImg;