import React, { useState } from "react";
import Input from './Input';
import Button from './Button';
import Header2 from './Header2';

const AddNewBlog = ({ createBlog, showMessage }) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const handleAddTitleOnChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleAddAuthorOnChange = (e) => {
    setNewAuthor(e.target.value)
  }

  const handleAddUrlOnChange = (e) => {
    setNewUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    if(newTitle === '') {
      showMessage('Input title', 'error')
    }
    else if (newAuthor === '') {
      showMessage('Input author', 'error')
    }
    else if (newUrl === '') {
      showMessage('Input url', 'error')
    } else {
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
  }
    return (
        <>
            <Header2 text={'Add New Blog'} />
            <form>
                <div>
                    Title: <Input placeholder={'Title..'} handleOnChange={handleAddTitleOnChange} id={'titleInput0'} /><br />
                    Author: <Input placeholder={'Author..'} handleOnChange={handleAddAuthorOnChange} id={'authorInput0'} /><br />
                    Url: <Input placeholder={'Url..'} handleOnChange={handleAddUrlOnChange} id={'urlInput0'} />
                </div>
                <div>
                    <Button type={'submit'} handleClick={addBlog} text={'Add'} id='addNewBlogButton' />
                </div>
            </form>
        </>
    )
}

export default AddNewBlog