import React, { useState } from "react"
import Input from './Input'
import Button from './Button'
import Header2 from './Header2'

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
      showMessage('Input title', 'danger')
    }
    else if (newAuthor === '') {
      showMessage('Input author', 'danger')
    }
    else if (newUrl === '') {
      showMessage('Input url', 'danger')
    } else {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }
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
              <div className={'form-group mb-0'}>
                <label className='mb-1'>Title</label><br />
                <Input placeholder={'Title..'} handleOnChange={handleAddTitleOnChange} id={'titleInput0'} /><br />
              </div>
              <div className={'form-group'}>
                <label className='mb-1'>Author</label><br />
                <Input placeholder={'Author..'} handleOnChange={handleAddAuthorOnChange} id={'authorInput0'} />
              </div>
              <div className={'form-group'}>
                <label className='mb-1'>URL</label><br />
                <Input placeholder={'Url..'} handleOnChange={handleAddUrlOnChange} id={'urlInput0'} />
              </div>
              <Button className={'mb-3'} variant={'primary'} type={'submit'} handleClick={addBlog} text={'Add'} id='addNewBlogButton' />
            </form>
        </>
    )
}

export default AddNewBlog