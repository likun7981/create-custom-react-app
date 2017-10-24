#!/usr/bin/env node

const commander = require('commander');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const ora = require('ora');
const downloadGithubRepo = require('download-github-repo');
const path = require('path');

const packageJson = require('./package.json');

const templateNpmPackagePrefix = 'react-template-';

const program = new commander.Command(packageJson.name)
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .option(
    '-t, --template [template-path-or-name]',
    'create react app use custom template'
  )
  .allowUnknownOption()
  .on('--help', () => {
    console.log();
    console.log(
      `  Other options are the same as ${chalk.green('create-react-app')}`
    );
    spawn.sync('create-react-app', ['--help'], { stdio: 'inherit' });
  })
  .parse(process.argv);

const args = program.args;

const rawArgs = program.rawArgs.slice(2);

let template;

// Hidden option for create-react-app
// You can see https://qurl.com/ffphl
if (program.template) {
  template = program.template;
} else if (args.length === 2) {
  template = args[0];
  rawArgs.splice(rawArgs.indexOf(template), 1);
}
if (template) {
  handleTemplate(template)
    .then(templateDir => path.join(templateDir, 'template'))
    .then(finallTemplate => {
      rawArgs.push(`--internal-testing-template=${finallTemplate}`);
      createReactApp(rawArgs);
    })
    .catch(error => {
      console.log(error);
      process.exit(0);
    });
} else {
  createReactApp(rawArgs);
}

function createReactApp(args) {
  const result = spawn.sync('create-react-app', args, { stdio: 'inherit' });
  if (result.error) {
    console.log(result.error.message);
  }
}

function isLocalPath(template) {
  return /^[./]|(^[a-zA-Z]:)/.test(template);
}

function globalNpmTemplatePackage(name) {
  let fullPath;
  if (name.indexOf(templateNpmPackagePrefix) === -1) {
    name = templateNpmPackagePrefix + name;
  }
  fullPath = path.join(__dirname, '../', name);
  return {
    isExists: fs.existsSync(fullPath),
    path: fullPath,
    name: name
  };
}

function handleTemplate(template) {
  return new Promise((resolve, reject) => {
    console.log();
    if (isLocalPath(template)) {
      console.log(`Local template ${chalk.green(template)}`);
      return resolve(template);
    }
    if (template.indexOf('/') !== -1) {
      console.log(`Start download template ${chalk.green(template)}`);
      const spinner = ora(`Downloading template ${chalk.green(template)}...`);
      console.log();
      spinner.start();
      const tmp = path.join(
        os.tmpdir(),
        'react-app-template-',
        `${new Date().valueOf()}`
      );
      return downloadGithubRepo(template, tmp, error => {
        spinner.stop();
        if (error) {
          return reject(`Download error: ${error}`);
        }
        console.log(`Download ${chalk.green(template)} success, start create`);
        return resolve(tmp);
      });
    }
    const result = globalNpmTemplatePackage(template);
    if (result.isExists) {
      console.log(
        `Find global npm template package ${chalk.green(result.name)}`
      );
      return resolve(result.path);
    }
    return reject(`can't resolve template ${chalk.red(template)}`);
  });
}
