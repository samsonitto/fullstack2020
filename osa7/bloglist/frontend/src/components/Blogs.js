import React from 'react';
import Header2 from './Header2';
import Button from './Button';
import Togglable from './Togglable';
import Blog from './Blog';
import Filter from './Filter';
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import BlogInfo from './BlogInfo'

const Blogs = (props) => {
  const matchBlog = useRouteMatch('/blogs/:id')
  const blogInfo = matchBlog ? props.blogs.find(blog => blog.id === matchBlog.params.id) : null

    return (
      <Switch>
        <Route path="/blogs/:id">
          <BlogInfo blog={blogInfo} handleLikeClick={props.handleLikeClick} />
        </Route>
        <Route path="/">
          <>
            <Filter handleFilterOnChange={props.handleFilterOnChange} />
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
        </Route>
      </Switch>
        
    )
}

export default Blogs