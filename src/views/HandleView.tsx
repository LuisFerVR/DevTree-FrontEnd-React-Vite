import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getUserByHandle } from "../api/DevTreeAPI";
import NotFoundView from "./NotFoundView";
import HandleData from "../components/HandleData";

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!;
  console.log(handle);

  const {data,isError,isLoading} = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ['handle', handle],
    retry:1
  })

  if(isLoading) return <p className="text-2xl text-white font-bold  text-center">Cargando...</p>
  if(isError) return <NotFoundView />
  
  if (data) return <HandleData data={data}/>;
}
