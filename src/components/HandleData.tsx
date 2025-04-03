import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}

export default function HandleData({data}: HandleDataProps) {

    const links : SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled);

  return (
    <div className="space-y-6 text-white">
        <p className="text-5xl text-center font-black">{data.handle}</p>
        {data.image && <img src={data.image} alt="Imagen de perfil" className="mx-auto max-w-[150px]"/>}
        <p className="text-lg text-center font-bold">{data.description}</p>

        <div className="flex flex-col mt-20 gap-6">
            {links.length ?
            links.map(link => (
                <a 
                    key={link.name}
                    className="bg-white flex justify-start px-5 py-2 items-center gap-5 rounded-lg "
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <img src={`/social/icon_${link.name}.svg`} alt="icono red social" className="max-w-[50px]"></img>
                    <p className="text-black capitalize font-bold text-lg">Visita mi: {link.name}</p> 
                </a>
            ))
            : <p className="text-center">No hay enlaces en este perfil</p>}
        </div>
    </div>
  )
}
