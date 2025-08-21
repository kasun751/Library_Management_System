import MenuLinks from "./MenuLinks.jsx";
import  './Navigation.css'


const Navigation = ()=>{
    return(
        <div className="menuLinksContainer">
            <MenuLinks src="/home" title="Home"/>
            <MenuLinks src="/ebook" title="E_Book_Home"/>
            <MenuLinks src="/enews" title="E_NewsPapers_Home"/>
            <MenuLinks src="/epastpapers" title="E_PastPapers_Home"/>

        </div>

    )
}

export default Navigation;