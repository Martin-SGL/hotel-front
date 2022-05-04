import React from 'react'
import {receptionist,manager} from './UserRoutes'
import { Link } from 'react-router-dom' 
// import Link from '@material-ui/core/Link';

const SideBar = ({role}) => {
    let links = null
    if(role==='receptionist'){
        links = receptionist
    }else{
        links = manager
    }

  return (
    <>
        <header>
            Menu
        </header>
        
        <div className='side-body'>
            <ol>
                {links.operations.map((el,index)=>(
                    <li key={'l1'+index}> 
                        <Link to={`${el.route}`} style={{color:'white',textDecoration:'none'}}>  
                                {el.icon} <span key={'a'+index}>{el.nameRoute} </span>
                        </Link>
                    </li>
                ))}
                
            </ol>
                {links.catalogues.length===0
                ? '' :<div style={{textAling:"center",width:'100%',padding:"10px 20px"}}>Catalogues</div>}
            <ol>
                {links.catalogues.map((el,index)=>(
                    <li key={'l1'+index}> 
                        <Link to={`${el.route}`} style={{color:'white',textDecoration:'none'}}>  
                                {el.icon} <span key={'a'+index}>{el.nameRoute} </span>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    </>
  )
}

export default SideBar