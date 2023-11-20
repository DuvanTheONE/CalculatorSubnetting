import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkerAlt, faFolder, faBriefcase, faChartBar } from '@fortawesome/free-solid-svg-icons';

const SideNavBar = ({ changeActiveComponent }) => {
    return (
        <div className="side-nav-bar">
            <button className="nav-icon" onClick={() => changeActiveComponent('home')}>
                <FontAwesomeIcon icon={faHome} />
            </button>
            {/* Repite esto para cada botón que desees añadir */}
            <button className="nav-icon" onClick={() => changeActiveComponent('ipCalculator')}>
                <FontAwesomeIcon icon={faChartBar} />
            </button>
        </div>
    );
};

export default SideNavBar;
