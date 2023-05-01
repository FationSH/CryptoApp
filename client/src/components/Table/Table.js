import React, { useState, useCallback } from 'react'
import Row from './Row';
import { StyledTable } from '../styles/StyledTable';
import DetailedCoinInfo from '../DetailedCoinInfo';
import axios from 'axios';

const titles = [
    'Name',
    'Symbol',
    'Price',
    'Highest Price 24h',
    'Lowest Price 24h',
    'Price Change 24h',
]

const Table = ({coins, search}) => {
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ infoCoin, setInfoCoin ] = useState([]);

    const wrapperSetShowInfoModal = useCallback(
        (val) => {
            setIsOpen(val);
        }, [setIsOpen]
    );

    const getData = async (id) => {
        const res = await axios.get(`http://localhost:3001/coins/${id}`);
        setInfoCoin(res.data);
      }

    const openInfo = async ( coin ) => {
        await getData(coin.id);
        setIsOpen(true);
    };

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) |
        coin.symbol.toLowerCase().includes(search.toLowerCase()) 
    );

    return (
        <>
            <StyledTable>
                <thead>
                    <tr>
                        {
                            titles.map((title, index) => (
                                <td key={index}>{title}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredCoins.map((coin, index) => (
                            <tr onClick={() => { openInfo(coin) }}>
                                <Row coin={coin} key={index}/>
                            </tr>
                        ))
                    }
                </tbody>
            </StyledTable>
            {modalIsOpen &&
                    <DetailedCoinInfo
                        coin={infoCoin}
                        modalIsOpen={modalIsOpen}
                        setIsOpen={wrapperSetShowInfoModal}
                    />
            }
        </>
    )
}

export default Table;