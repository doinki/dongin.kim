// @ts-check

import { config } from 'eslint-config-mado';
import { generateConfig as generateImportConfig } from 'eslint-config-mado/import';
import { generateConfig as generateJsConfig } from 'eslint-config-mado/javascript';
import { generateConfig as generatePrettierConfig } from 'eslint-config-mado/prettier';
import { generateConfig as generateSortConfig } from 'eslint-config-mado/sort';
import { generateConfig as generateTsConfig } from 'eslint-config-mado/typescript';
import { generateConfig as generateUnicornConfig } from 'eslint-config-mado/unicorn';

export default config([
  generateImportConfig(),
  generateJsConfig(),
  generatePrettierConfig(),
  generateSortConfig(),
  generateTsConfig({ tsconfigRootDir: import.meta.dirname }),
  generateUnicornConfig(),
]);
