import React, { useRef, useEffect  } from "react";
import ReactDOM from 'react-dom'
import rrwebPlayer from 'rrweb-player';
import "rrweb-player/dist/style.css";
import classes from './Modal.module.css'
import events from './myevents.json'
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";



export const TheVideoModal = (props) => {

    const containerRef = useRef();
 
     useEffect(() => {
        containerRef.current.innerHTML = "";
        const replayer = new rrwebPlayer({
          target: containerRef.current,
          props: {
            events,
            showController: true,
            width: 1000,
            height: 400,
            autoPlay: false,
            mouseTail: false,
            tags: {
              "start-recording": "green",
              "stop-recording": "red"
            }
          }
        });
        return () => {
          replayer.pause();
        };
      }, [containerRef, events]);
        
    
      

    return (<div className={classes.backdrop} onClick={props.onConfirm}>
        <div className={`${classes.videomodal} ${classes.card}`}>
            <div className={classes.content}>
                <div className="playerWraper">
                <div className="playerContainer rr-block" ref={containerRef}>
                </div>
              </div>
            </div>
        </div>
    </div>
    )
}


export const VideoModal = (props)=>{
    return <>
            {ReactDOM.createPortal(<TheVideoModal title={props.title} onConfirm={props.cancel}></TheVideoModal>, document.getElementById('modal')) }
    </>
}