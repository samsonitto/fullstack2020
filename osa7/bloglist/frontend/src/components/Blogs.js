import React from 'react';
import Header2 from './Header2';
import Button from './Button';
import Togglable from './Togglable';
import Blog from './Blog';

const Blogs = (props) => {
    return (
        <>
          <Header2 text={'Blogs'} />
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Info</th>
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