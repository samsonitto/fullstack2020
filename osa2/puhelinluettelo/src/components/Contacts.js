import React from 'react';
import Header2 from './Header2';
import Button from './Button';

const Contacts = (props) => {
    return (
        <>
            <Header2 text={'Numbers'} />
            {props.personsToShow.map((person, i) => 
                <div key={i}>
                    {person.name} {person.number} <Button text='delete' handleClick={() => props.handleDeleteClick(person.id, person.name)} />
                </div>
            )}
        </>
    )
}

export default Contacts