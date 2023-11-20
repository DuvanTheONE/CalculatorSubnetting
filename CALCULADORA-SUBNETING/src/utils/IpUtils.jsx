// Convierte un prefijo de subred en una máscara de subred.
export const convertPrefixToMask = (prefix) => {
    // Crea la representación binaria de la máscara de subred.
    const maskBits = '1'.repeat(prefix) + '0'.repeat(32 - prefix);
    const maskOctets = [];
    // Divide la representación binaria en octetos y convierte a decimal.
    for (let i = 0; i < maskBits.length; i += 8) {
        maskOctets.push(parseInt(maskBits.substring(i, i + 8), 2));
    }
    // Une los octetos para formar la máscara de subred en notación decimal con puntos.
    return maskOctets.join('.');
};

// Valida si una cadena es una dirección IP válida.
export const isValidIp = (ip) => {
    // Divide la dirección IP en sus partes y las convierte en números.
    const ipParts = ip.split('.').map(Number);
    // Verifica que haya exactamente cuatro partes y que todas sean números válidos dentro del rango de un octeto.
    return ipParts.length === 4 && ipParts.every((part) => !isNaN(part) && part >= 0 && part <= 255);
};

// Valida si una cadena es una máscara de subred válida.
export const isValidSubnetMask = (mask) => {
    // Convierte la máscara de subred a una representación binaria.
    const binaryMask = mask.split('.')
        .map(num => Number(num).toString(2).padStart(8, '0'))
        .join('');
    // Verifica que la máscara de subred no tenga bits '1' después de los bits '0' y que tenga exactamente 32 bits.
    return !binaryMask.includes('01') && binaryMask.length === 32;
};

// Calcula los detalles de la subred dada una dirección IP y una máscara de subred.
export const calculateSubnetDetails = (ip, mask) => {
    // Convierte la IP y la máscara de subred a su representación decimal.
    const ipParts = ip.split('.').map(part => parseInt(part, 10));
    const maskParts = mask.split('.').map(part => parseInt(part, 10));

    // Calcula la dirección de la red y de broadcast.
    const subnet = ipParts.map((part, i) => part & maskParts[i]); 
    const broadcast = subnet.map((part, i) => part | (~maskParts[i] & 255));

    // Calcula la primera y la última dirección IP utilizable en la subred.
    let startIp = [...subnet];
    startIp[3] += 1;
    let endIp = [...broadcast];
    endIp[3] -= 1;

    // Convierte las direcciones a notación decimal con puntos.
    const subnetStr = subnet.join('.');
    const broadcastStr = broadcast.join('.');
    const startIpStr = startIp.join('.');
    const endIpStr = endIp.join('.');

    // Cuenta el número de bits disponibles para los hosts y calcula el número de hosts posibles.
    const numberOfHostBits = mask.split('.')
        .map(num => ('00000000' + Number(num).toString(2)).slice(-8))
        .join('')
        .split('')
        .filter(bit => bit === '0').length; 
    const numberOfHosts = Math.pow(2, numberOfHostBits) - 2;

    // Devuelve un objeto con los detalles calculados de la subred.
    return {
        subnet: subnetStr,
        broadcast: broadcastStr,
        startIp: startIpStr,
        endIp: endIpStr,
        numberOfHosts, 
    };
};

// Determina la clase de una dirección IP.
export const getIpClass = (ip) => {
    const firstOctet = parseInt(ip.split('.')[0]);
    // Retorna la clase de la IP basada en el primer octeto.
    if (firstOctet >= 0 && firstOctet <= 127) return 'A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D';
    return 'E';
};

// Verifica si una dirección IP es privada.
export const isPrivateIp = (ip) => {
    const parts = ip.split('.').map(String);
    // Comprueba si la IP está dentro de los rangos conocidos de IPs privadas.
    return (
        parts[0] === '10' ||
        (parts[0] === '172' && parts[1] >= '16' && parts[1] <= '31') ||
        (parts[0] === '192' && parts[1] === '168')
    );
};
