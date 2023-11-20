import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [lines, setLines] = useState(['']);
    const [index, setIndex] = useState(0);
    const [commandSetIndex, setCommandSetIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    // Matriz de conjuntos de comandos
    const commandSets = [
        [
            'Press RETURN to get started!',
            'router> enable',
            'router# configure terminal',
            'router(config)# interface gigabitEthernet 0/0',
            'router(config-if)# ip address 192.168.1.1 255.255.255.0',
            'router(config-if)# no shutdown',
            'router(config-if)# exit',
        ],
        [
            'New command set started!',
            'router> disable',
            'router# reload',
        ],
    ];

    // Función para reiniciar la animación
    const resetAnimation = () => {
        setLines(['']);
        setIndex(0);
        setShowCursor(true);
        setCommandSetIndex((prevSetIndex) => (prevSetIndex + 1) % commandSets.length);
    };

    useEffect(() => {
        let cursorTimeout = null;
        let commandTimeout = null;

        // Usamos el conjunto actual de comandos basado en commandSetIndex
        const commands = commandSets[commandSetIndex];

        // Proceso para mostrar la línea actual de comandos
        if (index < commands.length) {
            const currentCommand = commands[index];
            if (lines[index] !== currentCommand) {
                setShowCursor(true);
                setTimeout(() => {
                    setLines(lines.map((line, i) => (i === index ? currentCommand.slice(0, line.length + 1) : line)));
                }, 100);
            } else {
                cursorTimeout = setTimeout(() => setShowCursor(false), 500);
                setTimeout(() => {
                    setIndex(index + 1);
                    setLines([...lines, '']);
                    if (index < commands.length - 1) {
                        setShowCursor(true);
                    }
                }, 2000);
            }
        } else if (index === commands.length) {
            // Esperamos un poco antes de reiniciar la animación
            commandTimeout = setTimeout(() => {
                resetAnimation();
            }, 1500); // 3 segundos antes de reiniciar la animación
        }

        // Limpieza de timeouts
        return () => {
            if (cursorTimeout) clearTimeout(cursorTimeout);
            if (commandTimeout) clearTimeout(commandTimeout);
        };
    }, [lines, index, commandSetIndex, commandSets]);


    return (
        <>
            <div className="container-home">
                <div className="left-home">
                    <div className="code-effect">
                        {lines.map((line, i) => (
                            <div key={i}>
                                {line}
                                {i === index && showCursor && <span className="blinking-cursor">|</span>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="right-home">
                    <div className="Big-Font">Bienvenido a My<span className='naranja'>IP</span></div>
                    <div className="Medium-Font">Descubre el poder de la <br /> gestión de direcciones IP a tu alcance.</div>
                    <div className="Littel-Font">Realiza operaciones de cálculo rápidamente para tu subnetting.</div>
                    <div className="buttons-home">
                        <button className='IpCalculator-btn'>Calcular</button>
                        <button className='About-btn'>Sobre MyIP</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;