import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useState } from 'react'

export const TheModal = (props) => {
    const [copy, setCopy] = useState(false)
     const {domain, script}= props.message;

     const showCopiedFunction = ()=>{
        setCopy(true)
        setTimeout(()=>{
            setCopy(false)
        },0)
     }

    return (<div className={classes.backdrop} onClick={props.onConfirm} >

        <div className={`${classes.modal} ${classes.card}`}>
            <header className={classes.header}>
                <h2> {props.title} </h2>
            </header>
            <div className={classes.content}>
                <h5>Your script for domain : {domain}</h5>
                <div className={`${classes.innerScroll} rounded bg-white p-3 text-dark`} >
                    <pre className="">
                        <code className="text-dark"> {` <script> ${script} </script>`} </code>
                    </pre>
                </div>
            </div>
            <footer className={classes.actions}>
                <div>
                <CopyToClipboard text={` <script> ${script} </script>`} onCopy={showCopiedFunction}>
                 <button className='btn btn-secondary' >Copy to Clipboard</button> 
                </CopyToClipboard>
                {copy && <span className='text-success pl-2'>Copied !</span> }
                </div>
                <button className='btn btn-primary' onClick={props.onConfirm}>Cancel</button>
            </footer>
        </div>
    </div>
    )
}


export const Modal = (props) => {
    return (<Fragment>
        {ReactDOM.createPortal(<TheModal title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('modal'))}
    </Fragment>

    )
}