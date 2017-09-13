# create-custom-react-app
> create a custom template react app

This is a `create-react-app` wrapper , so you can use anything that you can use in `create-react-app`, more detail use , you can see [create-react-app-user-guide](https://github.com/facebookincubator/create-react-app#user-guide)

## Install
```bash
# You must install create-react-app
$ npm install -g create-react-app

$ npm install -g create-custom-react-app
```

# Usage
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
```

example:
```bash
$ create-custom-react-app -t likun7981/test-git test-remote-project
```

* Global npm package like [Yeoman](https://github.com/yeoman/yeoman), the prefix is `react-app-template-<customname>`, example:

```bash
# Install the template with global
$ npm install -g react-app-template-simple

$ create-custom-react-app -t simple test-global-npm-package-project
```

* Local path template,  example
```bash
$ create-custom-react-app -t relative-or-absolute-local-path test-local-path-project
```

## Custom config  
You can use [react-app-rewired](https://github.com/timarney/react-app-rewired) to custom config,
more config package you can see [react-app-rewire-contrib](https://github.com/osdevisnot/react-app-rewire-contrib)

## Why
Because we want to customize the template, but you don't want to change [create-react-app](https://github.com/facebookincubator/create-react-app) all the time.


## License 

MIT, Lee<<likun7981@gmail.com>>
