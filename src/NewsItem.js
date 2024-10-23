import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <>
      <div className="my-3">
        <div className="card" style={{width: "25rem"}}>
            <img src={!imageUrl?"https://media.cnn.com/api/v1/images/stellar/prod/2024-10-19t000000z-709930866-ipaagc0008o9m6q-rtrmadp-3-independent-photo-agency.jpg?c=16x9&q=w_800,c_fill":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
      </div>
      </>
    )
  }
}

export default NewsItem
