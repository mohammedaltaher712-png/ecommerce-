import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function GuestRoute({ children }: any) {
  const user =
    useSelector((state: any) => state.auth?.user) ||
    JSON.parse(localStorage.getItem("user") || "null");

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}