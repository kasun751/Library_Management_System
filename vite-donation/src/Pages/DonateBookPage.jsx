import React, { useEffect, useState } from 'react'
import './DonateBookPage.css'
import SubHeader from '../Components/SubHeader'
import FooterComponent from '../Components/FooterComponent'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'

function DonateBookPage() {

  const [bookDetails, setBookDetails] = useState([]);
  useEffect(()=>{
    loadBookDetails();
    console.log("hello")
  },[])

  async function loadBookDetails(){
    try {
      const res = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/donateBookController.php`);
      
      setBookDetails(res.data);
      console.log(res.data);    
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
        <SubHeader />
        <div className='donateBook-container'>
        {bookDetails?.map((item,index)=>(
          <div className="">
            <Card style={{ width: '18rem' }} className='card_container'>
              <Card.Img variant="top" src="src\Images\book-img.svg" style={{ width: '50%' }}/>
              <Card.Body>
                <Card.Title>{item.BookName}</Card.Title>
                  <Card.Text>
                  <p>{item.ISBN_Number}</p>
                  <p>{item.AuthorName}</p>
                  <p>{item.PublishName}</p>
                </Card.Text>
                <Button variant="primary">Donate Now</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
        </div>
        <FooterComponent />
    </>
  )
}

export default DonateBookPage