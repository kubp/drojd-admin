import React from "react";
import axios from "axios";
import marked from "marked";
var Link = require('react-router-component').Link
import config from "../../config.js"

var querystring = require('querystring');

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            data: []
        }
        this.deletePage = this.deletePage.bind(this);
    }

    deletePage(r) {
        axios.delete(config().api_domain + '/menu/' + r._id + '', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem("apikey")
            }
        },).then(function(response) {}.bind(this))
        this.state.posts.splice(this.state.posts.indexOf(r), 1)
        this.setState({posts: this.state.posts})
    }

    componentWillMount() {

        axios.get(config().api_domain + '/menu', {
            headers: {
                'x-access-token': localStorage.getItem("apikey")
            }
        }).then(function(response) {
            this.setState({posts: response.data})
        }.bind(this))
    }

    render() {
        var that = this;
        return (
            <div>
                <div id="section-name">
                    <h1>Menu</h1>
                </div>

                <div id="content">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-1">
                                <span>
                                    <Link href="/cms-admin/menu/new">
                                        <button>Nová položka</button>
                                    </Link>
                                </span>

                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Akce</th>
                                            <th>Text</th>
                                            <th>Titulek</th>
                                            <th>Url</th>
                                        </tr>
                                        {this.state.posts.map(function(result) {
                                            return <PageList onClick={that.deletePage.bind(null, result)} data={result} key={result._id}/>;
                                        })}
                                    </tbody>
                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

class PageList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <tr>
                  <td>
                    <span className="icon page-remove" onClick={this.props.onClick}>
                        <i className="fa fa-times"></i>
                    </span>
                    <span>
                        <Link href={"/cms-admin/menu/edit/" + this.props.data._id}>
                            <i className="fa fa-arrow-down"></i>
                        </Link>
                    </span>
                </td>
                <td>{this.props.data.text}</td>
                <td>{this.props.data.title}</td>
                <td>{this.props.data.href}</td>

            </tr>

        )
    }

}

module.exports = Blog;
