import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('Docusaurus Documentation Site Setup', () => {
  const rootPath = process.cwd();
  
  describe('Project Structure', () => {
    it('should have proper Docusaurus installation', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'package.json'), 'utf-8')
      );
      
      // Should have Docusaurus dependencies
      expect(packageJson.dependencies?.['@docusaurus/core']).toBeDefined();
      expect(packageJson.dependencies?.['@docusaurus/preset-classic']).toBeDefined();
      expect(packageJson.dependencies?.['@docusaurus/module-type-aliases']).toBeDefined();
      
      // Should have TypeScript support
      expect(packageJson.devDependencies?.['@docusaurus/tsconfig']).toBeDefined();
      expect(packageJson.devDependencies?.['typescript']).toBeDefined();
      
      // Should have proper scripts
      expect(packageJson.scripts?.start).toBe('docusaurus start');
      expect(packageJson.scripts?.build).toBe('docusaurus build');
      expect(packageJson.scripts?.swizzle).toBe('docusaurus swizzle');
      expect(packageJson.scripts?.deploy).toBe('docusaurus deploy');
      expect(packageJson.scripts?.serve).toBe('docusaurus serve');
      expect(packageJson.scripts?.clear).toBe('docusaurus clear');
    });

    it('should have TypeScript configuration', () => {
      expect(fs.existsSync(path.join(rootPath, 'tsconfig.json'))).toBe(true);
      
      const tsConfig = JSON.parse(
        fs.readFileSync(path.join(rootPath, 'tsconfig.json'), 'utf-8')
      );
      
      expect(tsConfig.extends).toBe('@docusaurus/tsconfig');
      expect(tsConfig.compilerOptions?.strict).toBe(true);
    });

    it('should have proper directory structure', () => {
      // Core directories
      expect(fs.existsSync(path.join(rootPath, 'docs'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'src'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'static'))).toBe(true);
      
      // Documentation structure
      expect(fs.existsSync(path.join(rootPath, 'docs', 'intro.md'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'docs', 'getting-started'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'docs', 'api'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'docs', 'guides'))).toBe(true);
      
      // Source structure
      expect(fs.existsSync(path.join(rootPath, 'src', 'components'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'src', 'css'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'src', 'pages'))).toBe(true);
    });
  });

  describe('SmartBadge Configuration', () => {
    it('should have SmartBadge-specific Docusaurus configuration', () => {
      const configPath = path.join(rootPath, 'docusaurus.config.ts');
      expect(fs.existsSync(configPath)).toBe(true);
      
      const configContent = fs.readFileSync(configPath, 'utf-8');
      
      // Should have proper site configuration
      expect(configContent).toContain("title: 'SmartBadge Documentation'");
      expect(configContent).toContain("tagline: 'Semantic Intelligence for GitHub Repositories'");
      expect(configContent).toContain("url: 'https://docs.smartbadge.io'");
      expect(configContent).toContain("organizationName: 'amiable-dev'");
      expect(configContent).toContain("projectName: 'smart-badge-docs'");
      
      // Should have search configuration
      expect(configContent).toContain('algolia:');
    });

    it('should have custom SmartBadge theme', () => {
      const customCssPath = path.join(rootPath, 'src', 'css', 'custom.css');
      expect(fs.existsSync(customCssPath)).toBe(true);
      
      const cssContent = fs.readFileSync(customCssPath, 'utf-8');
      
      // Should have SmartBadge brand colors
      expect(cssContent).toContain('--ifm-color-primary: hsl(221.2, 83.2%, 53.3%)');
      expect(cssContent).toContain('--semantic-language:');
      expect(cssContent).toContain('--semantic-framework:');
      expect(cssContent).toContain('--semantic-complexity:');
      expect(cssContent).toContain('--semantic-maturity:');
      
      // Should use Geist font
      expect(cssContent).toContain('--ifm-font-family-base:');
      expect(cssContent).toContain('Geist');
    });

    it('should have proper static assets', () => {
      expect(fs.existsSync(path.join(rootPath, 'static', 'img', 'logo.svg'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'static', 'img', 'favicon.ico'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'static', 'img', 'smartbadge-social-card.png'))).toBe(true);
    });
  });

  describe('Interactive Components', () => {
    it('should have BadgeGenerator component', () => {
      const componentPath = path.join(rootPath, 'src', 'components', 'BadgeGenerator', 'index.tsx');
      expect(fs.existsSync(componentPath)).toBe(true);
      
      const componentContent = fs.readFileSync(componentPath, 'utf-8');
      
      // Should export proper React component
      expect(componentContent).toContain('export default function BadgeGenerator');
      expect(componentContent).toContain('import React');
      
      // Should have proper TypeScript types
      expect(componentContent).toContain('interface BadgeGeneratorProps');
    });

    it('should have ApiPlayground component', () => {
      const componentPath = path.join(rootPath, 'src', 'components', 'ApiPlayground', 'index.tsx');
      expect(fs.existsSync(componentPath)).toBe(true);
    });

    it('should have LiveExample component', () => {
      const componentPath = path.join(rootPath, 'src', 'components', 'LiveExample', 'index.tsx');
      expect(fs.existsSync(componentPath)).toBe(true);
    });
  });

  describe('Documentation Content', () => {
    it('should have introduction documentation', () => {
      const introPath = path.join(rootPath, 'docs', 'intro.md');
      expect(fs.existsSync(introPath)).toBe(true);
      
      const introContent = fs.readFileSync(introPath, 'utf-8');
      expect(introContent).toContain('# Welcome to SmartBadge Documentation');
      expect(introContent).toContain('semantic intelligence');
    });

    it('should have getting started guide', () => {
      const quickStartPath = path.join(rootPath, 'docs', 'getting-started', 'quick-start.md');
      expect(fs.existsSync(quickStartPath)).toBe(true);
      
      const content = fs.readFileSync(quickStartPath, 'utf-8');
      expect(content).toContain('# Quick Start');
      expect(content).toContain('```markdown');
      expect(content).toContain('[![');
    });

    it('should have API documentation structure', () => {
      const endpointsPath = path.join(rootPath, 'docs', 'api', 'endpoints.md');
      expect(fs.existsSync(endpointsPath)).toBe(true);
      
      const authPath = path.join(rootPath, 'docs', 'api', 'authentication.md');
      expect(fs.existsSync(authPath)).toBe(true);
    });

    it('should have proper sidebar configuration', () => {
      const sidebarPath = path.join(rootPath, 'sidebars.ts');
      expect(fs.existsSync(sidebarPath)).toBe(true);
      
      const sidebarContent = fs.readFileSync(sidebarPath, 'utf-8');
      expect(sidebarContent).toContain('tutorialSidebar:');
      expect(sidebarContent).toContain('Getting Started');
      expect(sidebarContent).toContain('API Reference');
      expect(sidebarContent).toContain('Guides');
    });
  });

  describe('Deployment Configuration', () => {
    it('should have Vercel configuration', () => {
      const vercelConfigPath = path.join(rootPath, 'vercel.json');
      expect(fs.existsSync(vercelConfigPath)).toBe(true);
      
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf-8'));
      expect(vercelConfig.buildCommand).toBe('npm run build');
      expect(vercelConfig.outputDirectory).toBe('build');
      
      // Should have proper redirects
      expect(vercelConfig.redirects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            source: '/api/:path*',
            destination: 'https://smartbadge.io/api/:path*'
          })
        ])
      );
    });

    it('should have environment configuration', () => {
      expect(fs.existsSync(path.join(rootPath, '.env.example'))).toBe(true);
      
      const envExample = fs.readFileSync(path.join(rootPath, '.env.example'), 'utf-8');
      expect(envExample).toContain('ALGOLIA_APP_ID=');
      expect(envExample).toContain('ALGOLIA_API_KEY=');
      expect(envExample).toContain('ALGOLIA_INDEX_NAME=');
    });
  });

  describe('Build Process', () => {
    it('should build successfully', async () => {
      const { stdout, stderr } = await execAsync('npm run build', {
        cwd: rootPath
      });
      
      // Should not have errors
      expect(stderr).not.toContain('ERROR');
      expect(stderr).not.toContain('WARN');
      
      // Build output should exist
      expect(fs.existsSync(path.join(rootPath, 'build'))).toBe(true);
      expect(fs.existsSync(path.join(rootPath, 'build', 'index.html'))).toBe(true);
      
      // Should have proper sitemap
      expect(fs.existsSync(path.join(rootPath, 'build', 'sitemap.xml'))).toBe(true);
    }, 60000);

    it('should pass TypeScript checks', async () => {
      const { stdout, stderr } = await execAsync('npx tsc --noEmit', {
        cwd: rootPath
      });
      
      expect(stderr).toBe('');
    }, 30000);

    it('should have valid package-lock.json', () => {
      expect(fs.existsSync(path.join(rootPath, 'package-lock.json'))).toBe(true);
    });
  });

  describe('SEO and Performance', () => {
    it('should have proper meta tags in built files', async () => {
      // Run build first if not already built
      if (!fs.existsSync(path.join(rootPath, 'build'))) {
        await execAsync('npm run build', { cwd: rootPath });
      }
      
      const indexHtml = fs.readFileSync(path.join(rootPath, 'build', 'index.html'), 'utf-8');
      
      // Should have proper meta tags
      expect(indexHtml).toContain('<meta property="og:title"');
      expect(indexHtml).toContain('<meta property="og:description"');
      expect(indexHtml).toContain('<meta property="og:image"');
      expect(indexHtml).toContain('<meta name="twitter:card"');
      
      // Should have proper title
      expect(indexHtml).toContain('<title>SmartBadge Documentation');
    }, 60000);

    it('should generate sitemap', async () => {
      if (!fs.existsSync(path.join(rootPath, 'build'))) {
        await execAsync('npm run build', { cwd: rootPath });
      }
      
      const sitemapPath = path.join(rootPath, 'build', 'sitemap.xml');
      expect(fs.existsSync(sitemapPath)).toBe(true);
      
      const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
      expect(sitemap).toContain('https://docs.smartbadge.io');
      expect(sitemap).toContain('<urlset');
    }, 60000);
  });
});