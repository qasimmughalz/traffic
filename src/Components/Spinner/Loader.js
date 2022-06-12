import ReactLoading from 'react-loading'


export const Spinner = ()=> {

    return(<span className='spinner' style={{display:'inline-block'}}>
       <ReactLoading type='spinningBubbles' color='#ffffff' height={25} width={25} ></ReactLoading>
    </span>)

}