import { Link } from "react-router-dom"

export default function RegisterView() {
  return (
    <>
        <h1 className="text-4xl text-white font-bold">Crear cuenta</h1>
        <nav>
            <Link to="/auth/login" className="text-white text-center text-lg block"> ¿Ya tienes una cuenta? Clic aquí para iniciar sesión</Link>
        </nav>
    </>
  )
}
