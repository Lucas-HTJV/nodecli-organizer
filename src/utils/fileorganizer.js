import fs from 'fs';
import path from 'path';
import { logger } from './logger.js';

// 🔹 DEFINA PRIMEIRO
const homeDir = process.env.USERPROFILE;

// 🔹 REGras de modelos de arquivo
const RULES = {
  Imagens: ['.png', '.jpg', '.jpeg', '.gif'],
  Videos: ['.mp4', '.mkv'],
  Documentos: ['.pdf', '.docx', '.txt'],
  Music: ['.mp3', '.wav'],
  Instalaveis: []
};

// 🔹 DESTINOS REAIS (fora do Downloads)
const DESTINATION_MAP = {
  Imagens: path.join(homeDir, 'Imagens'), //caminho das pastas 
  Videos: path.join(homeDir, 'Videos'),
  Documentos: path.join(homeDir, 'Documentos'),
  Musicas: path.join(homeDir, 'Musicas'),
  Instalaveis: path.join(homeDir, 'Instalaveis')
};

export function organizeFiles(targetPath, dryRun = false) {
  const shortcuts = {
    downloads: path.join(homeDir, 'Downloads'),
    documents: path.join(homeDir, 'Documents'),
    imagens: path.join(homeDir, 'Pictures'),
    videos: path.join(homeDir, 'Videos'),
    music: path.join(homeDir, 'Music')
  };

  const key = targetPath.toLowerCase();
  const resolvedPath =
    shortcuts[key] ??
    (path.isAbsolute(targetPath)
      ? targetPath
      : path.resolve(process.cwd(), targetPath));

  if (!fs.existsSync(resolvedPath)) {
    logger.error(`Pasta não encontrada: ${resolvedPath}`);
    return;
  }

  const files = fs.readdirSync(resolvedPath)
    .filter(file => fs.statSync(path.join(resolvedPath, file)).isFile());

  if (files.length === 0) {
    logger.success('Sem arquivos na pasta, tudo limpo.');
    return;
  }

  if (dryRun) {
    logger.info('🔍 Modo simulação (dry-run): nenhum arquivo será movido.');
  }

  files.forEach(file => {
    const fullPath = path.join(resolvedPath, file);
    const ext = path.extname(file).toLowerCase();

    let destination = 'Instalaveis';

    for (const folder in RULES) {
      if (RULES[folder].includes(ext)) {
        destination = folder;
        break;
      }
    }

    const destDir = DESTINATION_MAP[destination];

    if (!destDir) {
      logger.error(`Destino não configurado para: ${destination}`);
      return;
    }

    logger.info(`${file} → ${destination}`);

    if (!dryRun) {
      fs.mkdirSync(destDir, { recursive: true });
      fs.renameSync(fullPath, path.join(destDir, file));
    }
  });

  logger.success(
    dryRun ? 'Simulação concluída.' : 'Organização concluída.'
  );
}
