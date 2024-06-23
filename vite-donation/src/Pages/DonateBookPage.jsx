import React, {createContext, useEffect, useState } from 'react';
import './DonateBookPage.css';
import SubHeader from '../Components/SubHeader';
import FooterComponent from '../Components/FooterComponent';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import bookImg from '../Images/book-img.svg';
import DonateBookComponent from '../Components/DonateBookComponent';

export const SearchDataContext = createContext();

function DonateBookPage() {

  const [searchData, setSearchData] = useState("");
  const [bookPrice, setBookPrice] = useState();
  const [isbnNumber, setIsbnNumber] = useState();
  const [openPayment, setOpenPayment] = useState(false);
  const [offSet, setOffSet] = useState(0);

  const [bookDetails, setBookDetails] = useState([]);

  useEffect(() => {
    loadBookDetails(searchData,offSet);
  }, [searchData,offSet]);

  useEffect(() => {
    loadBookDetails(searchData,offSet);
  }, [searchData]);

  const handleClickDonate=(price, isbn)=>{
    setBookPrice(price)
    setIsbnNumber(isbn)
    setOpenPayment(true)
  }
  const onClickSetOffSet=(val)=>{
    if(offSet==0&&val<0){
    }else{
      if(bookDetails.length+25>offSet || val<0)
      setOffSet(offSet+val);
    }
  }

  async function loadBookDetails(searchData,offSet) {
    try {
      const res = await axios.get(`http://localhost:80/project_1/DonationHandling/Controller/donateBookController.php?search=${searchData}&offset=${offSet}`);
      setBookDetails(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SearchDataContext.Provider value={{searchData, setSearchData}}>
        <SubHeader searchBar={true} />
        <div id='page-numbers'>
              <img src="src\Images\prev-page-btn.svg" onClick={()=>onClickSetOffSet(-25)} />
              <p>Page {offSet/25+1}</p>
              <img src="src\Images\next-page-btn.svg" onClick={()=>onClickSetOffSet(25)} />
        </div>
        <div className='donateBook-container'>
          {bookDetails?.map((item, index) => (
            <div key={index} className="">
              <Card style={{ width: '18rem' }} className='card_container'>
                <Card.Img variant="top" src={bookImg} style={{ width: '40%' }} />
                <Card.Body>
                  <Card.Title>{item.BookName}</Card.Title>
                  <Card.Text>
                    <p><label>ISBN:</label> {item.ISBN_Number}</p>
                    <p><label>Author:</label> {item.AuthorName}</p>
                    <p><label>Publisher:</label> {item.PublishName}</p>
                    <p><label>Unit Price:</label> Rs. {item.BookPrice}/=</p>
                  </Card.Text>
                  <Button variant="primary" onClick={()=>handleClickDonate(item.BookPrice,item.ISBN_Number)}>Donate Now</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <FooterComponent />
        {openPayment && <DonateBookComponent onClickClose={()=>setOpenPayment(false)} amount={bookPrice} purpose={isbnNumber}/>}
      </SearchDataContext.Provider>
      
    </>
  );
}

export default DonateBookPage;
