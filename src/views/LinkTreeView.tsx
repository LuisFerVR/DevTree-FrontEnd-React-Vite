import DevTreeInput from "../components/DevTreeInput";
import { social } from "../data/social"
import { useState } from "react"

export default function LinkTreeView() {
  const [DevTreeLinks, setDevTreeLinks] = useState(social);
  console.log(DevTreeLinks);
  
  return (
    <div className="space-y-5">
      {
        DevTreeLinks.map(item=>(
          <DevTreeInput key={item.name} item={item} />
        ))
      }
    </div>
  )
}
