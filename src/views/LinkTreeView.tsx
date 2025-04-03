import DevTreeInput from "../components/DevTreeInput";
import { social } from "../data/social"
import { useEffect, useState } from "react"
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { SocialNetwork, User } from "../types";

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

  useEffect(()=> {
    const updatedData = DevTreeLinks.map(item => {
      const userLink = JSON.parse(user.links).find(link => link.name === item.name);
      if(userLink){
        return {...item,url:userLink.url, enabled:userLink.enabled}
      }
      return item;
    })
    setDevTreeLinks(updatedData);
  }, []);

  const handleUrlChange = (e:  React.ChangeEvent<HTMLInputElement>) => {

    const updateLinks = DevTreeLinks.map(link=>link.name === e.target.name ? {...link,url:e.target.value} : link)
    setDevTreeLinks(updateLinks);

  }

  const links:SocialNetwork[] = JSON.parse(user.links);

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

    let updatedItems: SocialNetwork[] = [];

    const selectedSocialNetwork = updatedLinks.find(link=> link.name === socialNetwork);
    if(selectedSocialNetwork?.enabled){

      const id = links.filter(link=>link.id).length + 1;

      if (links.some(link=>link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id
            }
          } else {
            return link;
          }
        })
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id
        }
        updatedItems = [...links, newItem];
      }
      
    }else {
      const indexToUpdated = links.findIndex(link => link.name === socialNetwork);
      updatedItems = links.map(link=>{
        if (link.name === socialNetwork) {
          return{
            ...link,
            id:0,
            enabled: false
          }
        }else if(link.id> indexToUpdated && (indexToUpdated !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1
          }
        }else {
          return link;
        }
      })
    }

    console.log(updatedItems);
    
    queryClient.setQueryData(['user'],(prevData:User)=>{
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
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
        onClick={()=>mutate(queryClient.getQueryData(['user']))}>Guardar cambios</button>
    </div>
  )
}
