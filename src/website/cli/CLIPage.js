import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import './CLIPage.css';

import cliDocsMarkdown from './cli-wiki.md';
import HeaderTitleLogo from '../home/HeaderTitleLogo';

export default class CLIPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="klyd-top-nav-bar">
          <HeaderTitleLogo />
          <Link className="klyd-top-nav-link" to="/">
            Home
          </Link>
          <Link className="klyd-top-nav-link" to="demo">
            Demo
          </Link>
          <a
            className="klyd-top-nav-link"
            href="https://github.com/stuharvey/kaleidoscope.js"
            rel="noopener noreferrer"
            target="_blank"
          >
            Github
          </a>
        </div>
        <div className="klyd-docs-container">
          <ReactMarkdown source={cliDocsMarkdown} />
        </div>
      </React.Fragment>
    );
  }
}
