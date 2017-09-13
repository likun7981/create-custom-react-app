# create-custom-react-app
> create a custom template react app

This is a `create-react-app` wrapper , so you can use anything that you can use in `create-react-app`, more detail use , you can see [create-react-app-user-guide](https://github.com/facebookincubator/create-react-app#user-guide)

## Install
```bash
# You must install create-react-app
$ npm install -g create-react-app

$ npm install -g create-custom-react-app
```

## Usage
```bash
$ create-custom-react-app --help

  Usage: create-custom-react-app <project-directory> [options]


  Options:

    -t, --template [template-path-or-name]  create react app use custom template
    -h, --help                              output usage information

  Other options are the same as create-react-app
```

The `template` can use the following three types:

* Remote git repo from `github`, 
```bash
$ create-custom-react-app -t <username>/<repo-name>  <project-name>
## example
$ create-custom-react-app -t likun7981/test-git test-remote-project
```

* Global npm package like [Yeoman](https://github.com/yeoman/yeoman), the prefix is `react-app-template-<customname>`, example:

```bash
# Install the template with global
$ npm install -g react-app-template-simple

$ create-custom-react-app -t simple test-global-npm-package-project
```

* Local path template, example
> ⚠️ Note: relative local path must start with `.`, example `./relative-path` instead of `relative-path` 

```bash
$ create-custom-react-app -t relative-or-absolute-local-path test-local-path-project
```
## Create template
It is recommended that you customize the template on the basis of [the official template](https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts/template)
1. Create `official template`
```bash
$ create-custom-react-app react-app-template-custom-name
```
2. Do what you want to do with the template
3. You can publish to npm, push to git or save locally, after it you can simple init it a project use `create-custom-react-app`
> ⚠️ Note: The __.gitignore__ file must rename to __gitignore__, you can see  
1.https://github.com/npm/npm/issues/1862  
2.https://qurl.com/5ysyl

## Custom config  
You can use [react-app-rewired](https://github.com/timarney/react-app-rewired) to custom config,
more config package you can see [react-app-rewire-contrib](https://github.com/osdevisnot/react-app-rewire-contrib)

## Why
Because we want to customize the template, but you don't want to change [create-react-app](https://github.com/facebookincubator/create-react-app) all the time.


## License 

MIT, Lee<<likun7981@gmail.com>>
