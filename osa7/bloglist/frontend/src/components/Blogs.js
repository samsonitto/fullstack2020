import React from 'react'
import Header2 from './Header2'
import Togglable from './Togglable'
import Blog from './Blog'
import Filter from './Filter'
import AddNewBlog from './AddNewBlog'

const Blogs = (props) => {
  const blogFormRef = React.createRef()

    return (
      <>
        <Togglable buttonLabel={'New Blog'} ref={blogFormRef} buttonHideLabel={'Cancel'}>
          <AddNewBlog 
            createBlog={props.handleAddClick}
            showMessage={props.showMessage}
          />
        </Togglable>
        <Filter handleFilterOnChange={props.handleFilterOnChange} />
        <Header2 text={'Blogs'} />
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {props.blogs.map((blog, i) => 
              <>
                <Blog blog={blog} user={props.user} handleLikeClick={props.handleLikeClick} handleDeleteClick={props.handleDeleteClick} rowIndex={`row${i}`} />
              </>
            )}
          </tbody>
        </table>
      </>
    )
}

export default Blogs