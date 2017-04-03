import React from "react";
import axios from "axios";
import marked from "marked";
var querystring = require('querystring');
import Editor from "./../Editor"

import config from "../../config.js"

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.axiosSend = this.axiosSend.bind(this);
        this.edit = this.edit.bind(this);
    }

    edit(md, raw) {
        this.setState({code_raw: raw})
        this.setState({code_md: md})

    }
    componentWillMount() {
        axios.get(config().api_domain + '/page/' + this.props.id + '').then(function(response) {
            this.setState({
                title: response.data.title,
                description: response.data.description,
                headline: response.data.headline,
                perex: response.data.post.perex,
                author: response.data.post.author,
                section: response.data.section,
                code_raw: response.data.raw_content,
                code_md_editor: response.data.md_content,
                tags: response.data.post.tags,
                image: response.data.image,
                visible: response.data.visible,
                url: response.data.url,
                layout: response.data.layout

            })
        }.bind(this))

    }

    handleChange(evt) {
        var name = evt.target.name;
        this.setState({
            [evt.target.name]: evt.target.value
        })

    }

    rawMarkup(evt) {
        var rawMarkup = marked(evt.target.value.toString());
        this.setState({code_raw: rawMarkup})
        this.setState({code_md: evt.target.value.toString()})
    }

    axiosSend() {

        axios.put(config().api_domain + '/page/' + this.props.id + '', querystring.stringify({
            title: this.state.title,
            description: this.state.description,
            headline: this.state.headline,
            perex: this.state.perex,
            tags: this.state.tags,
            author: this.state.author,
            raw_content: this.state.code_raw,
            md_content: this.state.code_md,
            url: this.state.url,
            section: this.state.section,
            tags: this.state.tags,
            visible: this.state.visible,
            image: this.state.image,
            url: this.state.url,
            comments: this.state.comments,
            layout: this.state.layout
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem("apikey")
            }
        },).then(function(response) {
            this.setState({errorMessage: 1})
        }.bind(this)).catch(function(response) {
            this.setState({errorMessage: 2})
        }.bind(this));

    }

    updateCode(newCode) {
        this.setState({code: newCode});
    }

    render() {
        return (
            <div>
                <div id="section-name">
                    <h1>Blog / Upravit Příspěvek</h1>
                </div>
                <div id="content">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-1">

                                <div>
                                    <div className="group">
                                        <label>Titulek</label>
                                        <span><input type="text" value={this.state.title} name="title" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Url</label>
                                        <span><input type="text" value={this.state.url} name="url" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Nadpis</label>
                                        <span><input type="text" value={this.state.headline} name="headline" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Popis</label>
                                        <span><input type="text" value={this.state.description} name="description" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Perex</label>
                                        <span><input type="text" value={this.state.perex} name="perex" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Obrázek</label>
                                        <span><input type="text" value={this.state.image} name="image" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Autor</label>
                                        <span><input type="text" value={this.state.author} name="author" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Tagy</label>
                                        <span><input type="text" value={this.state.tags} name="tags" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Šablona</label>
                                        <span><input type="text" value={this.state.layout} name="layout" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>Sekce</label>
                                        <span><input type="text" value={this.state.section} name="section" onChange={this.handleChange}/></span>
                                    </div>

                                    <div className="group">
                                        <label>code</label>
                                        <span>
                                            {this.state.code_md_editor
                                                ? <Editor change={this.edit.bind(null)} data={this.state.code_md_editor}/>
                                                : null}
                                        </span>
                                    </div>

                                    <div className="group">
                                        <label>Viditelnost</label>
                                        <span>
                                            <select name="visible" onChange={this.handleChange} value={this.state.visible}>
                                                <option value="0">Nezveřejněné</option>
                                                <option value="1">Zveřejněné</option>
                                            </select>

                                        </span>
                                    </div>

                                    <div className="group">
                                        <label>Komentáře</label>
                                        <span>
                                            <select name="comments" onChange={this.handleChange} value={this.state.comments}>
                                                <option value="true">Povoleny</option>
                                                <option value="false">Zakázány</option>
                                            </select>

                                        </span>
                                    </div>

                                    <div className="group">
                                        <label></label>
                                        <span>
                                            <button onClick={this.axiosSend}>Upravit příspěvek</button>
                                        </span>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {this.state.errorMessage == 1
                    ? <div className="message">Příspěvek byl úspěšně upraven</div>
                    : null}
                {this.state.errorMessage == 2
                    ? <div className="message error">Nastala chyba :(</div>
                    : null}
            </div>
        )
    }

}

module.exports = Blog;
