import { useEffect, useRef, useState } from "react";
import ImgG from "./ImgG";
function Aws(props) {
    const [data, setData] = useState([]);
    const[lastFile,setLastFile]=useState("")
    let images = "";
    if (data) {
        images = data.map((elem) => {

          return <ImgG key={elem} link={elem} host={props.selectedHost}></ImgG>; //map urls to image components
        });
      }
      useEffect(() => {
        fetch("/aws/data") //get image urls from server
                .then((awsdata) => awsdata.json())
                .then((dat) => {
                  setData(dat.images)
                  const len=dat.images.length()
                  setLastFile(dat.images[len-1])
                });
      
        return () => {
          
        }
      }, [])
      
    return <>
    <div className="imgCont">{images}</div>
       <div ></div></>;
}
export default Aws