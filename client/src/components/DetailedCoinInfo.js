import React from 'react';
import Modal from 'react-modal';

const DetailedCoinInfo = ( { coin, modalIsOpen, setIsOpen } ) => {
    const doc = new DOMParser().parseFromString(coin.description.en, 'text/html');

    const customStyles = {
        content: {
            width: '70%',
            height: '85%',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '30px',
            background: '#242229',
            // overflow: 'hidden',
            boxShadow: '15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60)',
        },
      };

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Detailed Information"
        >
            <div class="card-dark">
                <h2>{coin.name} - Current Price in USD: {coin.market_data.current_price.usd}</h2>
                <h3>Description</h3>
                <p style={{ wordBreak: 'break-all' }}>{doc.body.textContent || ''}</p>
                <h3>Price change</h3>
                <p>24 hours: {coin.market_data.price_change_24h}</p>
                <p>7 days: {coin.market_data.price_change_percentage_7d}</p>
                <p>14 days: {coin.market_data.price_change_percentage_14d}</p>
                <p>1 month: {coin.market_data.price_change_percentage_30d}</p>
                <p>2 months: {coin.market_data.price_change_percentage_60d}</p>
                <p>1 year: {coin.market_data.price_change_percentage_1y}</p>
                <h3>Highest Price 24h in USD: {coin.market_data.high_24h.usd}</h3>
                <h3>Lowest Price 24h in USD: {coin.market_data.low_24h.usd}</h3>
            </div>
        </Modal>
    );
}

export default DetailedCoinInfo