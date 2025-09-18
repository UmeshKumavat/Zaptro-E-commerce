import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return (
    <div>
      {user ? (
        children
      ) : (
        <div>
          <Navigate to="/" />{" "}
          {toast.error("Signup First to Access the Cart", {
            position: "top-center",
          })}
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
