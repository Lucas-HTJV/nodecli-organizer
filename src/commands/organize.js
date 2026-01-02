import { organizeFiles } from '../utils/fileorganizer.js';

export function organize(args) {
  const pathIndex = args.indexOf('--path');
  const dryRun = args.includes('--dry-run');

  if (pathIndex === -1 || !args[pathIndex + 1]) {
    console.log('❌ Use: nodecli organize --path <pasta> [--dry-run]');
    return;
  }

  const targetPath = args[pathIndex + 1];
  organizeFiles(targetPath, dryRun);
}
