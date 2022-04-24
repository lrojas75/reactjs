# Notes from ReactJS Developer course (w/ Hooks and Redux)

## Setup quick local server to get public server live

npm install -g live -server
live-server <folder_with_html_file> (This will automatically open a tab in browser with you html file).
Ex: live-server public

## Setup ReactJS project manually

npm init to create package.json file to handle project dependencies.

### Folder structure:

public (folder that will be loaded to be serve)

- script (will contain autogenerated files to load into browser. Compiled files from the src folder). These files
  will automatically change when the src folder files are compiled. The app file from the script is the one to be loaded
  in the html file of the public folder throught the div.
  src (Folder with all of our app's logic)

### Configure babeljs to compile the jsx code down to js (ES5).

npm install -g babel-cli
npm install babel-preset-react babel-preset-env

Create div tag that will load all you react app from the ReactDom function inside the body of the index.html
file in public folder.

Create script folder to contain your compiled scripts.

Create app.js file inside script folder which will be update automatically in the future when the src/app.js
file is compiled.

Create src folder at project root level.

Create your app.js file inside src folder which will be your starting point for your react app.

--> To manually compile a file from JSX to ES5 using babel: babel src/app.js --out-file=public/scripts/app.js --presets=env,react

### Create first React component:

**_As of React v18, a warning shows up to use createRoot method instead of render()_**

A React component is an ES6 class that extends from `React.Component`. We are extending from `React` and accessing the class `Component` to access all
of the features provided by a React Component. This Component class requires us to implement the method `render()` which has no arguments and returns jsx.

```JavaScript
class Header extends React.Component {
    render() {
        return <p>This is from Header</p>;
    }
}
```

React enforces that the created components have the first letter in uppercase because that's how React differentiates this component from the normal
html components so it can determine whether is rendering a React Component or an html element. This can be seen when the code for this component is
transpiled to ES6 using Babel and in that code we can see the calls to `React.createElement(Header, null)` instead of `React.createElement('div', null)`
which is how it would normally render an html element.
In this call `React.createElement(Header, null)`, we see how React understands it needs to render the class Header and not just a normal html element.

To render this custom html element we created to the screen, we use the `render(jsx, destination_div)` method provided by `ReactDOM` Object. So the
final code to show the Header component in the web browser is:

```JavaScript
class Header extends React.Component {
    render() {
        return <p>This is from Header</p>;
    }
}

const jsx = (
    <div>
        <h1>Title</h1>
        <Header />
    </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
```

**React Components are reusable so we can add as many `<Header />` tags as we want in there.**

### React component props

Component props are key-value objects that allow us to comunicate/pass data between components. The props we send to a component can have
any name we decide to give them and they are added inline inside the Component's tag where is being called in the code.

```JavaScript
    <Header title="Test value"/>
```

To access this props object inside the component, React allows us to reference it through the `this` keyword which is a current reference
to the component. So, `this.props` will allow us to access the object that has all the props sent to the component.

```JavaScript
    class Header extends React.Component {
        render() {
            this.props;
            return (
                <div>
                    <h1>{this.props.title}</h1>
                    <h2>Put your life in the hands of a computer</h2>
                </div>
            );
        }
    }
```

### JS -this- binding

The keyword `this` references the parent context of where it is located. So for this example:

```JavaScript
const obj = {
    name: 'Vikram',
    getName() {
        return this.name;
    }
}

console.log(obj.getName())
```

The keyword `this` works correctly because it will point to the parent context which in this case is `obj`. But there are cases where the
context is changed and the keyword example above won't work. An example of this is storing the `getName` method as a reference in a function:

```JavaScript
const obj = {
    name: 'Vikram',
    getName() {
        return this.name;
    }
}

const getName = obj.getName;

console.log(getName());
```

For this case, the `this` keyword is undefined because the new parent context is the function `getName` we defined and context is not transfered but
instead is lost in the process.
To not lose this context, we can use the method `bind` which takes as the first argument the object to be binded to `this` of the function.
So to fix the issue in the example above, we can do:

```JavaScript
const getName = obj.getName.bind(obj);
// OR
const getName = obj.getName.bind({ name: 'Andrew' });
```

**In React, when we define a constructor for the class, we do the binding for the function inside the constructor to avoid do it in in every render call**

```JavaScript
class Options extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
    }

    handleRemoveAll() {
        console.log(this.props.options);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleRemoveAll}>Remove All</button>
                {this.props.options.map(option => <Option key={option} option={option} />)}
            </div>
        );
    }
}
```

### React Component State

It's a key-value pair object that allows our components to manage data and re render the dom based on the changes automatically.
This object can be set initially with a default state and be updated by us using functions. React then will be in charge of
updating the dom with the changes.
To setup the state object, we just create it in the class constructor:

```JavaScript
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
```

We can easily access inside the Component by calling it like this `this.state.count`.
To update the state, we don't access it directly and modify it, instead we use the provided function by React `setState` which
takes as an argument a function and returns the modified state object.

```JavaScript
this.setState(() => {
    return {
        count: 1,
    }
})
```

If we need to update an existing value in the state instead of replacing it, we can take as an argument `prevState` which references
the current state before being updated and make the update:

```JavaScript
this.setState((prevState) => {
    return {
        count: prevState.count + 1,
    }
})
```

### React stateless functional component

It's a react component which is a function and doesn't have a state. It's faster than the class component due to not needing to extend
from React but it doesn't have a state or the functions to handle the state. Also, it doesn't have access to `this` or any of
the **life cycle functions**

```JavaScript
const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
};
```

### React Default props

We can set an object of default props for a component in case we don't receive a prop as an argument like expected.

```JavaScript
ComponentName.defaultProps = {
    propName: 'someValue'
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
}
```

### React life cycle functions

**_As of React v18, a warning shows up to use createRoot method instead of render()_**

These are built in methods that fire at various times in a given components' life. A component has three phases which are:

**_Mounting:_** The methods of this phase are called when the component is created and inserted into the DOM. The methods are:
constructor(), _getDerivedStateFromProps()_, render() and componentDidMount(). They are called in that order when rendering the component.

**_Updating:_** The methods of this phase are called _only_ when the component updates which means when the
props or the state of the component change. The methods are: _getDerivedStateFromProps()_, shouldComponentUpdate(), render()
_getSnapshotBeforeUpdate()_ and componentDidUpdate();

**componentDidUpdate(prevProps, prevState):** . This function takes as arguments **prevProps** which represents the props
object before the change and **prevState** which represents the state before the change.

**_Unmounting:_** The method of this phase is called when a component is removed from the DOM. The method is componentWillUnmount().

Life cycle diagram: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

### React Children prop

The `children` prop allows us to access code sent inside a component definition to use inside that component. So
if I define a stateless component like this:

```JavaScript
const Layout = (props) => {
    return (
        <div>
            <p>header</p>
            {props.children}
            <p>footer</p>
        </div>
    );
};
```

I have access in the props to `children` (This is also available for Class components through `this.props.children`).
The value for children is sent the following way:

```JavaScript
<Layout>
    <div>
        <h1>Page Title</h1>
        <p>This is my page</p>
    </div>
</Layout>
```

`<Layout>` is just an example component I created and whatever is inside the components' definition tags, will be sent inside
the `children` props attribute.

### React Modal

Package that has a customizable modal easy to use and very useful. To install it run `npm install react-modal`.
To use it, we just need to import `import Modal from 'react-modal';` inside the component that will be calling it
and here is an example implementation:

```Javascript
/* The following are some of the basic props that the Modal Component takes:
    isOpen: Takes a boolean that indicates if the modal show be visible or not.

    contentLabel: Allows screen readers to display info about the Modal.

    onRequestClose: Takes in an event handler so the modal can be closed when a user hits the "escape"
    key or clicks outside the modal.

    appElement: Allows you to specify the portion of your app that should be hidden (via aria-hidden )
    to prevent assistive technologies from reading content outside of the content of your modal. You
    can opt-out by adding setting the following prop on Modal: ariaHideApp={false} .
*/
<Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
    appElement={document.getElementById('app')}
  >
    <h3>Selected Option</h3>
    {/* Show p tag only if the user has selected an option */}
    {props.selectedOption && <p>{props.selectedOption}</p>}
    {/* Button to close the modal */}
    <button onClick={props.handleClearSelectedOption}>Okay</button>
  </Modal>
```

### Webpack

Webpack is an asset bundle that will combine the assets of our application (js files and html files) with the assets needed
from third party libraries to run our app. Webpack bundles all these files into one file to be served by the browser.

Install webpack using npm command `npm install webpack`.
Add script in package.json to run webpack `"build": "webpack --watch",`
So our `package.json` file will now look like this:

```JSON
{
  "name": "indecision-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "live-server": "^1.2.1",
    "webpack": "^5.72.0"
  },
  "devDependencies": {
    "webpack-cli": "^4.9.2"
  }
}
```

**Add webpack config file and add a simple initial setup:**
Create a file named **webpack.config.js**. This file is a Node script.
Add the basic setup to tell webpack which file to grab to bundle and the file (and path) to export the generated bundle

```JavaScript
    const path = require('path');

    module.exports = {
        entry: './src/app.js', // Tells webpack which file to grab to start the bundling process
        output: { // Tells webpack the patch and the name of the output file to create with the bundle.
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        }
    }
```

After runing the `build` command we created in `package.json` file, this will create a file named `bundle.js`
inside the `public` folder. So now, from our initial `folder structure` setup section we can remove the `scripts`
folder and our index file will now look like this:

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Indecision App</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/bundle.js"></script>
    </body>
</html>
```

We removed the scripts that imported `react` and also update the script that imported the `app.js` file from
the `scripts` to now grab the `bundle.js` file created by webpack.

_Additional modules to install from babel_
`npm i @babel/preset-react @babel/core @babel/preset-env`

**Webpack Loaders:**
They allow us to tell webpack to process specific files through a process so we can work with the result. So in the
following example, we will tell webpack to transform `.js` files using babel so we can render their code correctly
into the browser:

```JavaScript
// loader
    module: {
        rules: [{
            test: /\.js$/, //files that end in .js
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                },
            }
        }]
    }
// ---- Complete object would be:
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // loader
    module: {
        rules: [{
            test: /\.js$/, //files that end in .js
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                },
            }
      }]
    }
};
```

This goes inside the `module.exports` object.
Additionally to this setup, babel requires us to tell the presets that will be use during the file transform. We were
setting them before using the command line with the argument `--presets=env,react` but now we can do it with
the `options` attribute inside `use` in `rules`.

_babel-cli allows us to run babel through the command line and the babel-core package allows us to run babel through tools like webpack._

_babel-loader is a webpack plugin that allow us to teach webpack how to run babel when webpack sees certain files._

### New folder structure after adding webpack to project

project-name
|\_public
|**index.html
|**bundle.js
|\_src
|**components (this now includes all React components that will be created.)
|**app.js

### Source Maps

Add the following option to the `module.exports` object inside the webpack.config.js file:
`devtool: 'eval-cheap-module-source-map'`
This will allow webpack to point out more precisely where errors are happening when printing on console. Additionally,
there are more alternatives to `eval-cheap-module-source-map` but each one has an increase/decrease performance
on build.

### Webpack dev-server

Switch to DevServer to use a more specialized server to React than using `live-server` which is a more general one.
`npm i webpack-dev-server`
Add the attribute `devServer` to the `module.exports` object in the webpack.config.js file:

```JavaScript
devServer: {
    static: path.join(__dirname, 'public')
}
```

and update package.json script to `"dev-server": "webpack serve --mode=development"` to be able to run the dev server.

**_Also, build script changes to `"build": "webpack --mode production"`_**

### New Class syntax for React Class components - Class Properties Syntax

The **Class Properties Syntax** allows us to remove the need to use a constructor to define the properties of the Class and also
the need to bind `this` to them.

```JavaScript
class OldSyntax {
    constructor() {
        this.name = 'Mike';
    }
}

const oldSyntax = new OldSyntax();
console.log(oldSyntax);

// Prints object --> OldSyntax {name: 'Mike'}

// ----------------------

class NewSyntax {
    name = 'Jen';
}

const newSyntax = new NewSyntax();
console.log(newSyntax);

// Prints object --> NewSyntax {name: 'Mike'}
```

**Now to show the `this` binding change:**

```JavaScript
class OldSyntax {
    constructor() {
        this.name = 'Mike';
    }
    getGreeting() {
        return `Hi. My name is ${this.name}.`;
    }
}

const oldSyntax = new OldSyntax();
console.log(oldSyntax);
console.log(oldSyntax.getGreeting());
const getGreeting = oldSyntax.getGreeting(); // This breaks the "this" binding
console.log(getGreeting); // --> Throws error undefined

// To fix the binding, we would the to call the bind() function inside the constructor
constructor() {
    this.name = 'Mike';
    this.getGreeting = this.getGreeting.bind(this); // Fixes the "this" issue
}

// ------------------------------ Using the Class Properties Syntax:

class NewSyntax {
    name = 'Jen';
    getGreeting = () => {
        return `Hi. My name is ${this.name}.`;
    }
}

const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting();
console.log(newGetGreeting);
```

### Setup Webpack with SCSS

First we need to setup webpack to be able to read our css files and convert it into a js representation. To<br>
do this we install the following packages: `npm install css-loader style-loader`<br>
**css-loader:** Reads our css files and converts them into a js representation.<br>
**style-loader:** Takes the transformed css in the javascript (done by css-loader) and adds it to the DOM by <br>
injecting a `<style>` tag that will get our styles showing up in the browser.<br>

Now we add a new rule to the `webpack.config.js` so webpack uses these loaders when it builds our project and finds<br>
css files:

```Javascript
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
},
// --------- Complete rules object:
rules: [
    {
        test: /\.js$/, //files that end in .js
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
            },
        },
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
],
```

Now, to use `scss` we will need to install additional tools: `npm install sass-loader node-sass` and <br>
update our `webpack.config.js` rules. Our css rule will now look like this to handle `.scss` files:

```Javascript
{
    test: /\.s?css$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
},
```

_The ? in the `test` is to make optional the `s` so webpack can handle `scss` and `css` files._

**SCSS file naming syntax**
Regarding the scss files naming, the entry point file that will load our scss styles will have the name<br>
for example `styles.scss`. But for the files that will contain default styles that should be global <br>
thoughout the project we create a **partial style file** with the following name syntax `_name.scss`. <br>
Partial files are represented in the name with the underscore `_` and they contain certain default styles <br>
that we want to share globally in our app like a font family we want all our app to have. A common example is a file <br>
named `_base.scss`.

**SCSS file import**
Finally to get out styles displaying with our partials we defined, we need to import the partial files we have to our <br>
entry point file that is the one that gets imported into our app.js project file. To do this we import them like this <br>
inside `styles,scss` (_Notice that the underscore is left out in the import_):
`@import './base/base';`

**REM**
The use of REM is preferred due to REM scaling better up/down than pixels do.
By default 1rem = 16px.
To use REM in a base 10 relation, we need to add the following scss rule:

```CSS
html {
    font-size: 62.5%;
}
```

This specific value is added because 16 \* 0.625 = 10. So now 1REM = 10px;

**SCSS folder structure**
We already had a `styles` folder we we were going to add styles. So inside this we create:
styles
|\_base
|_\_\ \_base.scss
|\_components
|_\_\ \_header.scss
|\_styles.scss

The idea is to break out into partials the styles for each component we have in our project and import all those <br>
partials into `styles.scss` which will be loaded by `app.js`. Current file state at this point to introduce basic SCC<br>
into the project:

```SCSS
// ----- styles.css
@import './base/base';
@import './components/header';

// ----- _base.css
html {
    font-size: 62.5%;
}

body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
}

// ----- _header.css
.header {
    background: #20222b;
    color: white;
    margin-bottom: 4.8rem;
    padding: 1.6rem 0;
}
 .header__title {
     font-size: 3.2rem;
     margin: 0;
 }

 .header__subtitle {
     color: #a5afd7;
     font-size: 1.6rem;
     font-weight: 500;
     margin: 0;
 }
```

**Normalize.css package**
To reset default values that come with each browser so we don't run into issues with them when setting out specific<br>
css styles, we install this package so it can do the reset for us.
Install `npm install normalize.css` and import `import 'normalize.css/normalize.css';` into `app.js`.

**Adjust viewport of app to be responsive with mobile devices**
To allow the app to dynamically ajust to the device viewport we set the following meta tag inside the `index.html` <br>
file of our proyect `<meta name="viewport" content="width=device-width, initial-scale=1">`. With this, we tell the <br>
viewport to use the actual device width. To have a response app it is also needed a good css responsive code that <br>
backs this up. For example, using the `media` tag to apply specific css code based on some condition:

```SCSS
@media (min-width: 45rem) {
    .add-option {
        flex-direction: row;
    }
    .add-option__input {
        margin: 0 $s-size 0 0;
    }
}
```

### ES6 Import/Export

To import a file into another file inside your project we use the statement `import`
` import 'utils.js'`
**Named imports**
To import functions from other files into a file we use named imports:
`import { square } from './utils';`
but to actually be able to import it like that, we need to export it from the file that contains the function
using the `export` statement:
`export { square }`
Or export each function instead:

```JavaScript
export const square = x => x * x;
export const add = (a, b) => a + b;
```

**Default exports**
You can only have 1 default export in your file. To do a default export we just have to have the `as default`
after the function name in the `export` statement:

```JavaScript
export {
    square,
    add,
    substract as default
}
```

To import it, we add the name of the function or whatever name we choose outside of curly braces:
` import substract, { square, add } from 'utils.js'` or ` import anyName, { square, add } from 'utils.js'`.
We can import using the _anyName_ because the export is the default export and js will know which is the default one
since you can only have one.
To do inline exports and use default export, we can use `export default <expression>` to do it:

```JavaScript
export const square = x => x * x;
export const add = (a, b) => a + b;
const substract = (a, b) => a - b;

export default substract;
//OR
export default (a, b) => a - b;
```

It has to be an expression after the `export default` and not a statement because it will generate a syntax error:
`export default const substract = (a, b) => a - b;`
That will generate an error on runtime.
