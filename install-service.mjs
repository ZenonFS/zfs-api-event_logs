// install-service.js
import { Service } from 'node-windows';

export const svc = new Service({
    name: 'Labor Log API',
    description: 'Labor Log API as a Windows service',
    script: 'C:\\Users\\EQUIPO\\.services\\zfs-restapi-labor_binnacle\\dist\\src\\main.js',
});

svc.on('install', () => {
    svc.start();
});

svc.install();
