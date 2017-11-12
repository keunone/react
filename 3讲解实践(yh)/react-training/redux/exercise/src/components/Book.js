import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import '../css/book.css'

const Book = ({ name, img, author }) => (
    <Card style={{ height: 200, margin: 50, width: 120,"float":"left",overflow: "hidden" }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image" >
        <img style ={{height: 150}} alt="example" width="100%" src={img} />
        </div>
        <div className="custom-card">
            <h3 style ={{"overflow":"hidden","whiteSpace":"no-wrap"}}>{name}</h3>
            <p style ={{"overflow":"hidden","whiteSpace":"no-wrap"}}>{author}</p>
        </div>
    </Card>
)

Book.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
}

export default Book