import React, {useState, Children, isValidElement, cloneElement, Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import '../css/styles.css';
import { ReactStyledTooltip } from '../components/StyledTooltip';
import { ReactComponent as MessengerIcon } from '../svgs/icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../svgs/icons/caret.svg';
import { ReactComponent as CogIcon } from '../svgs/icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../svgs/icons/chevron.svg';
import { ReactComponent as BoltIcon } from '../svgs/icons/bolt.svg';
import { ReactComponent as BellIcon } from '../svgs/icons/bell.svg';
import { ReactComponent as ChartIcon } from '../svgs/icons/chart.svg';
import { ReactComponent as UserIcon } from '../svgs/icons/user.svg';
import { ReactComponent as EditIcon } from '../svgs/icons/pencil.svg';
import { ReactComponent as LoginIcon } from '../svgs/icons/login.svg';
import { ReactComponent as LogoutIcon } from '../svgs/icons/logout.svg';


class NavBar extends Component {

    state = {}

    constructor() {
        super();
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            titleWidth: 140.91,
            liWidth: 64,
            navItems: [
                {id: 'contact', tooltipContent: 'Leave a Message', icon: <MessengerIcon/>},
                {id: 'news', tooltipContent: 'News', icon:<BoltIcon/>},
                {id: 'stats', tooltipContent: 'Statistics', icon: <ChartIcon/>},
                {id: 'settings', tooltipContent: 'About Me', icon: <UserIcon/>}
            ]
        }
        let navWidth = window.innerWidth - (14*2)
        let spaceForItems = navWidth - this.state.titleWidth - 100;
        let numberOfNavItems = ~~(spaceForItems / this.state.liWidth) - 1 >= 0 ? ~~(spaceForItems / this.state.liWidth) - 1 : 0
        this.state = {
            ...this.state,
            width: window.innerWidth,
            height: window.innerHeight,
            titleWidth: 140.91,
            liWidth: 64,
            numberOfNavItems,
        }
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    updateDimensions() {
        let navWidth = window.innerWidth - (14*2)
        let spaceForItems = navWidth - this.state.titleWidth - 100;
        let numberOfNavItems = ~~(spaceForItems / this.state.liWidth) - 1 >= 0 ? ~~(spaceForItems / this.state.liWidth) - 1 : 0;
        this.setState({
            ...this.state,
            width: window.innerWidth,
            height: window.innerHeight,
            numberOfNavItems,
        })
    }

    render() {
        let counter = 1;
        const listOfNavItems = this.state.navItems.map((item) => {
            if(counter <= this.state.numberOfNavItems ) {
                counter+= 1
                return <NavItem to={'/'+item.id} id={item.id} tooltipContent={item.tooltipContent} icon={item.icon} key={counter}/>
            }
            else return null
        })
        return(
            <nav className='my-navbar'>
                <Link data-tip data-for='home' to='/' className='left brand-logo' style={{paddingLeft: '2rem', paddingBottom: '1rem'}}>WEBSITE</Link>
                <ReactStyledTooltip id='home' place='bottom' effect='solid'><div>Home</div></ReactStyledTooltip>
                <ul className='right navbar-nav'>
                    {listOfNavItems}
                    {this.state.navItems.length - this.state.numberOfNavItems !== 0 && <NavItem id='quickAccess' tooltipContent='Quick Access' icon={<CaretIcon/>} >
                        <Dropdown numberOfDropdownItems={ this.state.navItems.length - this.state.numberOfNavItems }/>
                    </NavItem>}
                </ul>
            </nav>
        )
    }
}

function NavItem(props) {

    const [open, setOpen] = useState(false);

    function closeMenu() {
        setOpen(false);
    }

    const childrenWithProps = Children.map(props.children, child => {
        if(isValidElement(child)) {
            return cloneElement(child, { closeMenu })
        }

        return child;
    })
    
    return(
        <li data-tip data-for={props.id} className='nav-item'>
            <Link to={typeof props.to === 'undefined' ? '#!' : props.to} className='my-icon-button' onClick={() => setOpen(!open)}>
                {props.icon}
            </Link>
            {open && childrenWithProps}
            {(typeof props.tooltipContent !== 'undefined' && !open) && <ReactStyledTooltip id={props.id} place='bottom' effect='solid'>
            <div>{props.tooltipContent}</div>
            </ReactStyledTooltip>}
        </li>
    )
}

function Dropdown({ closeMenu, numberOfDropdownItems }) {
    
    const [activeMenu, setActiveMenu ] = useState('main');
    const [ menuHeight, setMenuHeight ] = useState(null);
    const dropdownItems = [
        {id: 'contact', tooltipContent: 'Contact Us', icon: <MessengerIcon/>},
        {id: 'news', tooltipContent: 'News', icon:<BoltIcon/>},
        {id: 'stats', tooltipContent: 'Statistics', icon:<ChartIcon/>},
        {id: 'settings', tooltipContent: 'Settings', icon: <CogIcon/>}
    ]

    function claclHeight(el) {
        const height = el.offsetHeight + 30;
        setMenuHeight(height);
    }

    function DorpdownItem(props) {

        return(
            <Link to={typeof props.to === 'undefined' ? '#!' : props.to} className='menu-item' 
            onClick={() => {
                if (typeof props.goToMenu === 'undefined') {
                    closeMenu();
                }
                else {
                    setActiveMenu(props.goToMenu)
                }
                }}>
                <span className='my-icon-button'>{props.leftIcon}</span>
                {props.children}
            </Link>
        )
    }

    function getMainDropdown() {
        const len = dropdownItems.length
        let counter = 1;
        if( numberOfDropdownItems === 0 ) {
            console.log('0');
            return null;
        }
        const dropItems = dropdownItems.map((item) => {
            if(len-counter >= numberOfDropdownItems) {
                counter += 1;
                return null;
            }
            else {
                counter += 1;
                return (<DorpdownItem to={'/'+item.id} leftIcon={item.icon} key={counter}>{item.tooltipContent}</DorpdownItem>)
            }
        })
        return dropItems;
    }

    return(
        <div className='dropdown' style={{ height: menuHeight }}>
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500}
            classNames='menu-primary' onEnter={claclHeight}>
                <div className='menu'>
                    {/* <DorpdownItem leftIcon={<UserIcon/>} goToMenu='profile'>My Profile</DorpdownItem> */}
                    {getMainDropdown()}
                </div>
            </CSSTransition>

            <CSSTransition in={activeMenu === 'profile'} unmountOnExit timeout={500}
            classNames='menu-secondary' onEnter={claclHeight}>
                <div className='menu'>
                    <DorpdownItem leftIcon={<ChevronIcon/>} goToMenu='main'>Back</DorpdownItem>
                    <DorpdownItem leftIcon={<LoginIcon/>}>Sign Up</DorpdownItem>
                    <DorpdownItem leftIcon={<EditIcon/>}>Edit Profile</DorpdownItem>
                    <DorpdownItem leftIcon={<LogoutIcon/>}>Log Out</DorpdownItem>
                    <DorpdownItem leftIcon={<BellIcon/>}>Subscribe</DorpdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

export default NavBar;