import './Card.css';

function Card ({title,author,category,description,image_path}){
    return(
       <>
           <div className="card" style={{width: '18rem'}}>
               <img src={image_path} className="card-img-top" alt="Book Cover" />
                   <div className="card-body">
                       <h4 className="card-title">{title}</h4>
                       <h5 className="card-title">{author}</h5>
                       <h6 className="card-title">{category}</h6>
                       <p className="card-text">{description}</p>
                       <a href="#" className="btn btn-primary">Buy Now</a>
                   </div>
           </div>
       </>
    )
}

export default Card;