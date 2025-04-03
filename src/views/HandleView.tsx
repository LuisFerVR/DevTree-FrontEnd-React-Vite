import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getUserByHandle } from "../api/DevTreeAPI";

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!;
  console.log(handle);

  const {data,isError,isLoading} = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle', handle],
    retry:1
  })
  console.log(data);
  
  return (
    <div>HandleView</div>
  )
}
