import { Link } from "react-router-dom"

export default function LoginView() {
  return (
    <>
        <h1>LoginView</h1>
        <nav>
            <Link to="/auth/register">¿No tienes una cuenta? Clic aquí para crear una</Link>
        </nav>
    </>
  )
}
