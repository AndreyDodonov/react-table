import React from 'react';
import GithubIcon from './icons/GitHubIcon';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo_wrapper">
                    {/* <button className="logo_button">
                        <GithubIcon />
                    </button> */}

                    <a className="logo_button" href="https://github.com/AndreyDodonov/react-table"><GithubIcon /></a>

                </div>
                <div className="logo">

                    <h2>TABLE</h2>
                </div>
            </div>
        )
    }
}

export default Header;
