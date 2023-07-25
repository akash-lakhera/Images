import { useEffect, useRef, useState } from "react";
import ImgG from "./ImgG";
import { gapi } from "gapi-script";
function Google(props) {
  const [data, setData] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [first, setFirst] = useState("");
  let images = "";
  
  if (data) {
    images = data.map((elem) => {
      return <ImgG key={elem.id} host={props.selectedHost} link={elem.id}></ImgG>;
    });
  }
  useEffect(() => {
    gapi.load("client:auth2", initClient);
    function initClient() {
      gapi.client
        .init({
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
        })
        .then(function () {
        
          return gapi.client.drive.files.list({
            pageSize: 10,
            q: "'1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS' in parents",
            key: "AIzaSyAMoX6rrXtKX7M14VaV_DWW7nTiHEpyrT4",
          });
        })
        .then((r) => {
    
          setData(r.result.files);
          setPageToken(r.result.nextPageToken);
          setFirst(true);
        });
    }

    return () => {};
  }, []);
  const observerTarget = useRef(null);

  useEffect(() => {


    const fetchData = () => {
      if (first) {


        gapi.client.drive.files
          .list({
            pageSize: 10,
            q: "'1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS' in parents",
            key: "AIzaSyAMoX6rrXtKX7M14VaV_DWW7nTiHEpyrT4",
            pageToken: pageToken,
          })
          .then((r) => {
            const d = [...data, ...r.result.files];
            setData(d);
            setPageToken(r.result.nextPageToken);
          });
      }
    };

    const observer = new IntersectionObserver(//using intersection observer to watch infinite scroll
      (entries) => {
        if (entries[0].isIntersecting) {
    
          fetchData();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {

      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, first]);

  return <>
     <div className="imgCont">{images}</div>
     
        <div ref={observerTarget}></div></>;
// ref is attached to the element after the images container to trigger observer and fetch data when this element appears on the viewport
}
export default Google;
