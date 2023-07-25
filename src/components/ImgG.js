import { useEffect,useState } from "react"
import { gapi } from "gapi-script"
function ImgG(props) {
    const[data,setData]=useState("")

    useEffect(() => {
        if(props.host=="google"){

        // get particualr image url from drive using image id recieved earlier
       gapi.client.drive.files.get({
            fileId: props.link,
            key:"AIzaSyAMoX6rrXtKX7M14VaV_DWW7nTiHEpyrT4",
            fields:"thumbnailLink"
        
          }).then(res=>setData(res.result.thumbnailLink))
        }
        else setData(props.link)
      return () => {
        
      }
    }, [])
    //  
  return (
    <div className="imgItems">
      {data?<img style={{   float:"left", height: "100%",
    width: "100%",objectFit:"cover"}} src={data}></img>:""}
    </div>
  )
  
}
export default ImgG
