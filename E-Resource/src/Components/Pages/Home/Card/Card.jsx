import './Card.css';

function Card (){
    return(
       <>
           <div className="card" style={{width: '18rem'}}>
               <img src="..." className="card-img-top" alt="..."/>
                   <div className="card-body">
                       <h5 className="card-title">Book title</h5>
                       <h6 className="card-title">Book Author</h6>
                       <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut debitis dolor error facilis harum in porro quaerat sequi ut voluptatibus.</p>
                       <a href="#" className="btn btn-primary">Buy Now</a>
                   </div>
           </div>
       </>
    )
}

export default Card;