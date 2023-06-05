// install-service.js
import { Service } from 'node-windows';

const svc = new Service({
    name: 'Labor Log API',
    description: 'Labor Log API as a Windows service',
    script: 'C:\\Users\\EQUIPO\\.services\\zfs-web-event_logs\\dist\\src\\main.js',
});

svc.on('install', () => {
    svc.start();
});

svc.install();
