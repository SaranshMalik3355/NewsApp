import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  constructor(props) {
    super(props);
    // console.log("hello i am a constructor from news component");
    this.state = {
      articleState: [],
      loading: false,
      page: 1,
    };
    document.title = ` ${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews(pageNo) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=979b5dedaed64cc6b30c33dda0cb29ac&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true }); // for spinner
    // Now we will fetch api which which will return promises
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articleState: parsedData.articles,
      totalResultState: parsedData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articleState.map((element) => {
              return (
                <div className="col-md-4 " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : " "}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResultState / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
