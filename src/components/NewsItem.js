import React, { Component } from "react";

export class NewsItem extends Component {
  // constructor() {
  //     super();
  //     console.log("hello i am a constructor")
  // }
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <>
        <div className="my-3">
          <div className="card">
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ left: "90%", zIndex: "1" }}
            >
              {source}
            </span>
            <img
              src={
                !imageUrl
                  ? "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="
                  : imageUrl
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  By {!author ? "Unknown" : author} on{" "}
                  {new Date(date).toLocaleString(undefined, {
                    timeZone: "Asia/Kolkata",
                  })}{" "}
                </small>
              </p>
              <a
                rel="noreferrer"
                href={newsUrl}
                target="_blank"
                className="btn btn-sm btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
