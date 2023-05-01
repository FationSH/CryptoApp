import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Table from './components/Table/Table';
import { Center } from './components/styles/Center';
import Pagination from './components/Pagination';

const COINS_PER_PAGE = 50;

function App() {
  const [ coins, setCoins ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ search, setSearch ] = useState('');

  const decreasePage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage-1);
    }
  }

  const increasePage = () => {
    setCurrentPage(currentPage+1);
  }

  const getData = async () => {
    const res = await axios.get(`http://localhost:3001/coins/markets/${COINS_PER_PAGE}/${currentPage}`);
    setCoins(res.data);
  }

  useEffect(() => {
    getData();
  }, [currentPage]);

  // Get current coins
  const indexOfLastCoin = currentPage * COINS_PER_PAGE;
  const indexOfFirstCoin = indexOfLastCoin - COINS_PER_PAGE;

  return (
      <Center V H>
        <div>
          <div>
            <input 
              type='text' 
              className='input'
              placeholder='Search for a coin...' 
              onChange={e => setSearch(e.target.value)}/>
            <span style={{padding:"185px"}}/>
            <Pagination pageNumber={currentPage} decreasePage={decreasePage} increasePage={increasePage} />
          </div>
          <Table coins={coins} search={search}/>
        </div>
      </Center>
  );
}

export default App;
