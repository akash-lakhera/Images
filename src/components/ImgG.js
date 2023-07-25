import { useEffect,useState } from "react"
import { gapi } from "gapi-script"
function ImgG(props) {
    const[data,setData]=useState("")

    useEffect(() => {
        if(props.host=="google"){

        
       gapi.client.drive.files.get({
            fileId: props.link,
            key:"AIzaSyCwPWpd5XQGSvO1Se2VjpBtGPnGCRbln9o",
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