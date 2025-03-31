import DevTreeInput from "../components/DevTreeInput";
import { social } from "../data/social"
import { useState } from "react"
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { User } from "../types";

export default function LinkTreeView() {
  const [DevTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user:User = queryClient.getQueryData(['user'])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (e) => {
      toast.error(e.message)
    },
    onSuccess: () => {
      toast.success("Perfil actualizado correctamente")
    }
  })

  const handleUrlChange = (e:  React.ChangeEvent<HTMLInputElement>) => {

    const updateLinks = DevTreeLinks.map(link=>link.name === e.target.name ? {...link,url:e.target.value} : link)
    setDevTreeLinks(updateLinks);
    console.log(updateLinks);
    
  }

  const handleEnableLink = (socialNetwork:string) => {
    const updatedLinks = DevTreeLinks.map(link => {
      if (link.name === socialNetwork) {
        if(isValidUrl(link.url)){
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Ingrese una URL válida");
        }
      }
      return link;
    });
    setDevTreeLinks(updatedLinks);
    queryClient.setQueryData(['user'],(prevData:User)=>{
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })
  }

  return (
    <div className="space-y-5">
      {
        DevTreeLinks.map(item=>(
          <DevTreeInput key={item.name} item={item}  handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink}/>
        ))
      }
      <button
        className="bg-cyan-400 p-2 text-lg  w-full uppercase text-slate-600 rounded font-bold"
        onClick={()=>mutate(user)}>Guardar cambios</button>
    </div>
  )
}
