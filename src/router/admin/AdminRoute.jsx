import { Navigate } from "react-router-dom";

const AdminRoute = ({ element, role }) => {
  if (role !== "ADMIN") {
    return <Navigate to="/404" replace />;
  }
  return element;
};

export default AdminRoute;