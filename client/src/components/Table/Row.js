import React from 'react';
import '../../App.css';

const Row = ( { coin } ) => {
    return (
        <>
            <td>{coin.name}</td>
            <td style={{minWidth: '200px'}}>
                <img src={coin.image} alt={coin.name} style={{width: '20px', borderRadius: '100px'}} />
                <span>{coin.symbol}</span>
            </td>
            <td>{coin.current_price}</td>
            <td>{coin.high_24h}</td>
            <td>{coin.low_24h}</td>
            <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                {`${coin.price_change_percentage_24h} %`}
            </td>
        </>
    )
}

export default Row;