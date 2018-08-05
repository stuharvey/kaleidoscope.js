import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

import HeaderTitleLogo from './HeaderTitleLogo';

export default class Home extends Component {
  render() {
    return (
      <div className="klyd-home">
        <div className="klyd-top-nav-bar">
          <HeaderTitleLogo />
          <Link className="klyd-top-nav-link" to="cli">
            CLI Docs
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
        <div className="klyd-home-page">
          <img
            className="klyd-logo-image"
            src="/images/svgurt_logo.png"
            alt="svgurt logo"
          />
          <div className="klyd-home-desc">
            Kaleidoscope is an{' '}
            <strong>
              <a
                href="https://github.com/stuharvey/kaleidoscope.js"
                rel="noopener noreferrer"
                target="_blank"
              >
                open source
              </a>
            </strong>{' '}
            image manipulation effect.
          </div>
          <div className="klyd-demo-link-container">
            <Link className="klyd-demo-link" to="demo">
              Live Demo
            </Link>
          </div>
          <table className="klyd-example-table">
            <tr>
              <th>Input</th>
              <th>Output</th>
            </tr>
            <tr>
              <td>
                <img
                  className="klyd-image-example-input"
                  src="/images/palm.png"
                  alt="palm tree input"
                />
              </td>
              <td>
                <img
                  className="klyd-svg-example-output"
                  src="/images/palm-1.svg"
                  alt="palm tree svg output"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="klyd-image-example-input"
                  src="/images/palm.png"
                  alt="palm tree"
                />
              </td>
              <td>
                <img
                  className="klyd-svg-example-output"
                  src="/images/palm-2.svg"
                  alt="palm tree svg output"
                />
              </td>
            </tr>
            <tr>
              <td>
                <img
                  className="klyd-image-example-input"
                  src="/images/palm.png"
                  alt="palm tree"
                />
              </td>
              <td>
                <img
                  className="klyd-svg-example-output"
                  src="/images/palm-3.svg"
                  alt="palm tree svg output"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
