import React from 'react';
import Header2 from './Header2';
import PlainText from './PlainText';

const Contacts = (props) => {
    return (
        <>
            <Header2 text={'Numbers'} />
            {props.personsToShow.map((person, i) => 
                <PlainText text={`${person.name} ${person.number}`} key={i} />
            )}
        </>
    )
}

export default Contacts