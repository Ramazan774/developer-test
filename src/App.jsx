import React, { useState } from 'react';
import {connect} from 'react-redux';
import {addItem, deleteItem} from './redux/actions';
// import styled from './styled-components'

const Container = ({ wishList, onClick }) => {
    return (
        <div className='container'>
            {wishList.map((item) => (
                <div className='item' key={item} onClick={() => onClick(item)}>
                    {item}
                </div>
            ))}
        </div>
    );
};

const App = ({ wishList, addItem, deleteItem }) => {
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleAddClick = () => {
        if (userInput.length && !wishList.includes(userInput)) addItem(userInput);
        setUserInput('');
    };

    const handleSubmit = () => {
        if (wishList.length) {
            alert('Wish list submitted to Santa!');
            wishList.forEach((item) => deleteItem(item));
            setUserInput('');
        }
    };
        
    return (
        <div className='app'>
            <div className='container'>
                <h3 className='title'>MY WISHLIST</h3>
                <Container onClick={deleteItem} wishList={wishList} />
                <input
                    type='text'
                    className='item-input'
                    onChange={(e) => handleInputChange(e)}
                    value={userInput}
                />

                <button className='add-btn btn' onClick={handleAddClick}>
                    Add
                </button>

                <button className='submit-btn btn' onClick={handleSubmit}>
                    Submit
                </button>
        </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        wishList: state.wishList,
    }
}

export default connect(mapStateToProps, { addItem, deleteItem })(App);