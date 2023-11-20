import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const SocialBar = () => {
    return (
        <div className="social-bar">
            <a className="logo" href="Logo">My<span className='naranja'>IP</span></a>
            <div className="social-icons">
                <a href="tu_enlace_de_instagram" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="tu_enlace_de_twitter" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="tu_enlace_de_github" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </div>
        </div>
    );
};

export default SocialBar;
