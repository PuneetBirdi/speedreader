import React, {Fragment} from 'react'
import spinner from './spinner.gif';

export const Spinner = () => {
   return (
      <Fragment>
         <img src={spinner} alt="loading..." style={{width: '5.0rem', margin:"auto", display:"block" }}/>
      </Fragment>
   )
}

export default Spinner