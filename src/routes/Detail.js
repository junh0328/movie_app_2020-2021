import React from "react";
import './Detail.css';
class Detail extends React.Component {
    componentDidMount() {
        const { location, history } = this.props;
        if (location.state === undefined) {
            history.push("/");
        }
    }
    render() {
        const { location } = this.props;
        if (location.state) {
            return <div className="box">
                <p><img src={location.state.poster} alt={location.state.title}></img></p>
                <h2>{location.state.year}, {location.state.title}</h2>
                <p>{location.state.summary}</p>

            </div>
        } else {
            return null;
        }
    }
}

export default Detail;

/*
year,
title,
summary,
poster,
genres
                 */