import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';
import {ReactComponent as Github} from '../svgs/icons/github-logo.svg';
import {ReactComponent as LinkedIn} from '../svgs/icons/linkedin-logo.svg';
import {ReactComponent as Kaggle} from '../svgs/icons/k.svg';
import {ReactComponent as Coffee} from '../svgs/icons/coffee-cup.svg';
import { ReactStyledTooltip } from '../components/StyledTooltip';

function Footer(props) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        if( width !== window.innerWidth){
            setWidth(window.innerWidth);
        }
    }, [window.innerWidth]);

    return(
        <div className='my-navbar' style={{display: 'flex', paddingLeft: '40%', height: 79, bottom: 0, width: '100%'}}>
            <li data-tip data-for='github' className='nav-item' style={{float: 'left', cursor: 'pointer'}}>
                <a href='https://github.com/Aditi-Mohan' target='_blank'><div className='my-icon-button'><Github/></div></a>
                <ReactStyledTooltip id='github' place='top' effect='solid'>
                    <div>Github</div>
                </ReactStyledTooltip>
            </li>
            <li data-tip data-for='linkedin' className='nav-item' style={{float: 'left', cursor: 'pointer'}}>
                <div className='my-icon-button'><LinkedIn/></div>
                <ReactStyledTooltip id='linkedin' place='top' effect='solid'>
                    <div>LinkedIn</div>
                </ReactStyledTooltip>
            </li>
            <li data-tip data-for='kaggle' className='nav-item' style={{float: 'left', cursor: 'pointer'}}>
                <a href='https://www.kaggle.com/aditimon' target='_blank' ><div className='my-icon-button'><Kaggle/></div></a>
                <ReactStyledTooltip id='kaggle' place='top' effect='solid'>
                    <div>Kaggle</div>
                </ReactStyledTooltip>
            </li>
            <li data-tip data-for='patreon' className='nav-item' style={{float: 'left', cursor: 'pointer'}}>
                <a href='https://www.buymeacoffee.com/aditimon' target='_blank'><div className='my-icon-button'><Coffee/></div></a>
                <ReactStyledTooltip id='patreon' place='top' effect='solid'>
                    <div>Buy Me a Coffee</div>
                </ReactStyledTooltip>
            </li>
        </div>
    )
}

export default Footer;