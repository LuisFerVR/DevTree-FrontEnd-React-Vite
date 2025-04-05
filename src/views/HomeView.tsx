import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import "../css/index.css";

export default function HomeView() {
  return (
    <>
        <Header />
        <main className="bg-gary-100 py-10 min-h-screen bg-no-repeat bg-right-top bg-home">
            <div className="max-w-5xl ma-auto mt-10">
                <div className=" lg:w-1/2 px-10 lg:p-0 space-y-6">
                <h1 className="text-6xl font-black">
                    Todas tus <span className="text-cyan-400">Redes Sociales</span> en un solo lugar
                </h1>
                <p className="text-slate-800 text-xl">Unete a más de 200,000 developers compartiendo tus redes sociales, comparte tu perfil de Tiktok, Facebook, Instagram, YouTube, GitHub y más</p>

                <SearchForm />
                </div>
            </div>
        </main>
    </>
  )
}
