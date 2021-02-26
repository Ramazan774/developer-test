import React, { useState } from 'react';
import {connect} from 'react-redux';
import {addItem, deleteItem} from './redux/actions';
import styled from 'styled-components'

const Page = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #D1D1D1;
    padding-top: 25px;
`;

const Container = styled.div`
    width: 400px;
    height: 540px;
    background-color: #FCC0CB;
    border-radius: 8px;
    box-shadow: 0 0 13px 2px black;
    text-align: center;
    margin: auto;
    padding-top: 7px;
`;

const ItemsContainer = styled.div`
    width: 280px;
    height: 270px;
    background: white;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    margin: auto;
    text-align: left;
    padding-left: 10px;
`;

const Input = styled.input`
    width: 285px;
    height: 25px;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 5px;
    margin-top: 20px;
    outline-color: #ADD3FA;
`;

const Button = styled.button.attrs(props => ({
    size: props.size || "100px"
}))`
    display: block;
    margin: 20px auto;
    background-color: #92EC93;
    width: ${props => props.size};
    border: none;
    border-radius: 5px;
    border-width: 1px;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    outline: none;
    font-weight: bold;
`;

const App = ({ wishList, addItem, deleteItem }) => {
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleAddClick = (e) => {
        e.preventDefault();
        if (userInput.length && !wishList.includes(userInput)) addItem(userInput);
        setUserInput('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (wishList.length) {
            alert('Wish list submitted to Santa!');
            wishList.forEach((item) => deleteItem(item));
            setUserInput('');
        }
    };
        
    return (
        <Page>
            <Container>
                <h1>MY WISHLIST</h1>
                <ItemsContainer>
                    {
                    wishList.map((item, index) => {
                            return <p
                            key={index} 
                            onClick={() => deleteItem(item)}
                            style={{'cursor': 'pointer'}}>{item}</p>
                        })
                    }
                </ItemsContainer>
                <Input
                    type='text'
                    className='item-input'
                    onChange={(e) => handleInputChange(e)}
                    value={userInput}
                />
                <Button onClick={handleAddClick}>Add</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Container>
        </Page>
    );
};

const mapStateToProps = (state) => {
    return {
        wishList: state.wishList,
    }
}

export default connect(mapStateToProps, { addItem, deleteItem })(App);