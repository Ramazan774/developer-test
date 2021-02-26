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
`

const AddButton = styled.input`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 150px;
    height: 40px;
    border: 1px solid grey;
    border-radius: 4px;
    background-color: #7df57f;
    box-shadow: 1px 1px 1px 1px grey;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
`

const SubmitButton = styled.input`
    background-color: #7df57f;
    width: 270px;
    height: 48px;
    border: 1px solid grey;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px 1px grey;
    font-weight: bold;
    font-size: 16px;
`

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
                <AddButton 
                    type='submit' 
                    value='Add' 
                    onClick={handleAddClick}
                />
                <SubmitButton 
                    type='submit' 
                    value='Submit' 
                    onClick={handleSubmit}
                />
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