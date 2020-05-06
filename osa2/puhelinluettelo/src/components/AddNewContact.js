import React from "react";
import Input from './Input';
import Button from './Button';
import Header2 from './Header2';

const AddNewContact = (props) => {
    return (
        <>
            <Header2 text={'Add New Contact'} />
            <form>
                <div>
                    Name: <Input placeholder={'Name..'} handleOnChange={props.handleAddOnChange} id={'nameInput0'} /><br />
                    Number: <Input placeholder={'Number..'} handleOnChange={props.handleAddNumberOnChange} id={'numberInput0'} />
                </div>
                <div>
                    <Button type={'submit'} handleClick={props.handleAddClick} text={'Add'} />
                </div>
            </form>
        </>
    )
}

export default AddNewContact