import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import config from "../../config.js"
import Editor from "./../Editor"

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.axiosSend = this.axiosSend.bind(this);
    }

    componentWillMount() {}

    handleChange(evt) {
        var name = evt.target.name;
        this.setState({ [evt.target.name]: evt.target.value})
   }

    axiosSend() {
        axios.post(config().api_domain + '/menu', querystring.stringify({href: this.state.href, text: this.state.text, title: this.state.title, active: this.state.active}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem("apikey")
            }
        },);
    }

    render() {
        return (
            <div>
                <div id="section-name">
                    <h1>Menu / Nová Položka</h1>
                </div>
                <div id="content">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-1">

                            <div>
                                <div className="group">
                                    <label>Href</label>
                                    <span><input type="text" value={this.state.href} name="href" onChange={this.handleChange}/></span>
                                </div>

                                <div className="group">
                                    <label>Text</label>
                                    <span><input type="text" value={this.state.text} name="text" onChange={this.handleChange}/></span>
                                </div>

                                <div className="group">
                                    <label>Titulek</label>
                                    <span><input type="text" value={this.state.title} name="title" onChange={this.handleChange}/></span>
                                </div>

                                <div className="group">
                                    <label>práva</label>
                                    <span>
                                        <select name="active" onChange={this.handleChange}>
                                            <option value="1">Aktivní</option>
                                            <option value="0">Neaktivní</option>
                                        </select>

                                    </span>
                                </div>

                                <div className="group">
                                    <label></label>
                                    <span>
                                        <button onClick={this.axiosSend}>Vytvořit položku</button>
                                    </span>

                                </div>

                            </div>
                        </div>

                        </div>

                    </div>
                </div>

            </div>

        )
    }

}

module.exports = Blog;
