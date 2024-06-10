import MenuLinks from "./MenuLinks.jsx";
import  './Navigation.css'


const Navigation = ()=>{
    return(
        <div className="menuLinksContainer">
            <MenuLinks src="/home" title="Home"/>
            <MenuLinks src="/add" title="Add Resource"/>
            <MenuLinks src="/my_books" title="My Books"/>
            {/*<MenuLinks src="/remove" title="Remove Resource"/>*/}
            {/*<MenuLinks src="/buy" title="Buy Resource"/>*/}
            {/*<MenuLinks src="/view" title="View Resource"/>*/}
            {/*<MenuLinks src="/search" title="Search Resource"/>*/}
        </div>

    )
}

export default Navigation;