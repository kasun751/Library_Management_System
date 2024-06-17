function Home (){
    return(
        <>
        <h2>E-Resources Section</h2>

            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/ebook">E-Books Section</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/enews">E-NewsPapers Section</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/epastpapers">E-PastPapers Section</a>
                </li>
            </ul>
        </>
    )
}

export default Home;