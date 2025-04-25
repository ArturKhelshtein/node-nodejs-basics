import path from 'path';
import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
    const cpuCount = cpus().length;
    const workerPath = path.join(fileURLToPath(import.meta.url), '../worker.js');
    const results = [];
    const workers = [];
    
    const promises = Array.from({ length: cpuCount }, (_, i) => {
        return new Promise((resolve) => {
            const worker = new Worker(workerPath);
            workers.push(worker);

            worker.on('message', (result) => {
                results[i] = { status: 'resolved', data: result };
                resolve();
            });

            worker.on('error', () => {
                results[i] = { status: 'error', data: null };
                resolve();
            });

            worker.postMessage(10 + i);
        });
    });

    await Promise.all(promises);
    console.log(results);

    workers.forEach(worker => worker.terminate());
};

await performCalculations();