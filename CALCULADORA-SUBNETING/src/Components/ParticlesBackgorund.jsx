import React, { useEffect } from 'react';

const ParticlesBackground = () => {

    useEffect(() => {
        window.particlesJS.load('particles', '/particles.json', function() {
            console.log('callback - particles.js config loaded');
        });
    }, []);

    return (
        <div id="particles"></div>
    );
}

export default ParticlesBackground;
