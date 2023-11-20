import React, { useState } from 'react';
import { convertPrefixToMask, isValidIp, isValidSubnetMask, calculateSubnetDetails, getIpClass, isPrivateIp } from '../utils/IpUtils';

const IpCalculator = () => {
    const [ip, setIp] = useState('');
    const [mask, setMask] = useState('');
    const [usePrefix, setUsePrefix] = useState(false);
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);

    const handleCalculate = () => {
        if (!isValidIp(ip) || (!isValidSubnetMask(mask) && !usePrefix)) {
            setError('IP o máscara de subred/prefijo inválido.');
            return;
        }

        setError('');
        let subnetDetails;

        if (usePrefix) {
            const convertedMask = convertPrefixToMask(mask);
            subnetDetails = calculateSubnetDetails(ip, convertedMask);
        } else {
            subnetDetails = calculateSubnetDetails(ip, mask);
        }

        const ipClass = getIpClass(ip);
        const privateIp = isPrivateIp(ip);

        setResults({
            subnetDetails,
            ipClass,
            isPrivate: privateIp,
        });
    };

    const handleToggle = () => {
        setUsePrefix(current => !current);
    };

    const renderSubnetInfo = () => {
        if (!results) return null;

        return (
            <div className="infoContainer">
                <h2>Información de Subnet</h2>
                <div>Detalles de Subnet:</div>
                <ul>
                    <li>Subred: {results.subnetDetails.subnet}</li>
                    <li>Dirección de broadcast: {results.subnetDetails.broadcast}</li>
                    <li>IP de inicio: {results.subnetDetails.startIp}</li>
                    <li>IP de fin: {results.subnetDetails.endIp}</li>
                    <li>Número de hosts: {results.subnetDetails.numberOfHosts}</li>
                </ul>
                <div>Clase IP: {results.ipClass}</div>
                <div>{results.isPrivate ? 'IP Privada' : 'IP Pública'}</div>
            </div>
        );
    };

    const renderCalculatorForm = () => (
        <div className="calculatorContainer">
            <input
                className="inputField"
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Dirección IP"
            />
            <input
                className="inputField"
                type="text"
                value={mask}
                onChange={(e) => setMask(e.target.value)}
                placeholder={usePrefix ? "Prefijo de subred" : "Máscara de subred"}
            />
            <div className="toggleContainer">
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={usePrefix}
                        onChange={handleToggle}
                    />
                    <span className="switch"></span>
                </label>
                <label className="toggle-switch-label">Usar prefijo de subred</label>
            </div>

            <button className="calculateButton" onClick={handleCalculate}>Calcular</button>
            {error && <div className="error">{error}</div>}
        </div>
    );

    return (
        <div className="mainContainer">
            <div className="screen">
                {renderCalculatorForm()}
                {renderSubnetInfo()}
            </div>
        </div>
    );
};

export default IpCalculator;