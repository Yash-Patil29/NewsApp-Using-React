import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <>
      <div className="my-3">
        <div className="card" style={{width: "25rem"}}>
            <img src={!imageUrl?"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description }</p>
              <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
            </div>
          </div>
      </div>
      </>
    )
  }
}

export default NewsItem
