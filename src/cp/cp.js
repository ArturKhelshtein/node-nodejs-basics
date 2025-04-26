import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const childProcess = spawn('node', [path.join(__dirname, 'files', 'script.js'), ...args], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);

    childProcess.stderr.on('data', (data) => {
        console.error(`Child process stderr: ${data}`);
    });

    childProcess.on('error', (error) => {
        console.error(`Child process error: ${error.message}`);
    });

    childProcess.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

spawnChildProcess(['someArgument1', 'someArgument2']);
