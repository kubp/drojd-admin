import React from "react";
import axios from "axios";
import marked from "marked";

var Link = require('react-router-component').Link

class Main extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (

            <div>
                <div id="section-name">
                    <h1>Main Page</h1>
                </div>
                <div id="content">
                    <div className="wrapper">
                      <div className="row">
                          <div className="col-1">
                              <h2>Not Found</h2>
                              <p>Sorry</p>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        )
    }

}

module.exports = Main;
