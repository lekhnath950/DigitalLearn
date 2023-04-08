import React from 'react'
// import {Link} from 'react-router-dom'
import "./Post.css"

const Post = () => {
  return (
    <div>

        <div>
            {/* <Link> */}
                <div className='container'>
                    <div className='thumbnail'>
                        <img src={require('./image.jpg')} alt='thumbnail' className='thumbimg' />
                    </div>

                    <div className='userpp'>
                        <img src={require('./image.jpg')} alt='pp' className='profilepic' />
                    </div>
                    <div>
                        <h3>Title of video</h3>
                        <h5>Name</h5>
                    </div>
                </div>
            {/* </Link> */}
        </div>
    </div>
  )
}

export default Post