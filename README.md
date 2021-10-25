# Pigeon

![Postman Pigeon](./pigeon.jpg)

<img src='https://img.shields.io/badge/npm-1.0.0-brightgreen.svg' alt='node-v1' />

```js
import React from "react";
import ReactDOM from "react-dom";
import "./Pigeon";   // <---- import after react
import App from "./App";

ReactDOM.render(<App/>,document.querySelector("#root"));
```

### Motivation
The communication is always boring between components, yes there are amazing libraries such as Redux, Mobx even EventBus.

Sometimes you need call a method from a component to another, or sometimes you need to setState from a component to another for a little job.

You have spent your time to setup big amazing libraries 'cause they have actions, reducers, sagas and more.

Please do not confuse, this is not drill down or callback 👻

The main goal is solving your little problem with Pigeon.



### How it works?
```js

// ComponentA
// release this pigeon in componentDidMount or useEffect

class ComponentA extends React.Component {
    constructor(props){
        super(props);
        
        release(this);  // <-- You should fly the pigeon ☺️
    }
    
    render(){
      <button onClick={() => pigeOn('ComponentB.sayHello', {foo: "bar"})}>Fly now!</button>
    }
}

// ComponentB
// You don't need release(this) if you won't call a method from this to another
class ComponentB extends React.Component {
  constructor(props){
    super(props);
  }

  sayHello(data){
      console.log("Hello from ComponentB");
      
      this.setState({myKey: data.foo});
  }
}
```

### Install

- Npm: `npm install react-pigeon`

### Rules

- **pigeOn** function takes two arguments, first one is required (string);

```js
pigeOn("ComponentName.MethodName", {"your": "data"})
// or
pigeOn("ComponentName.MethodName")
```

- Pigeon throws an error if you did not release it when you call **pigeOn**
- If you release pigeon many times, you will see a warning in console like;

  ***The Component is already in cage.***

## Example Scene

You can see it in action with this [demo](https://xenodochial-neumann-4a5285.netlify.app)

```js
import React from "react";
import './style.css';

class Component1 extends React.Component {
  constructor(props) {
    super(props);
    release(this);
  }

  sendData = () => {
    pigeOn('Component2.changeNumber', {count: 19});
    pigeOn('Component3.changeMyColor', {newColor: '#cc9200'});
    pigeOn('Component4.introduceYourself');
    pigeOn('Component4.anotherMethod');
  }

  render(){
    return (
            <div style={{background: '#f4f4f4', padding: 20}}>
              <h1>Component1</h1>
              <button onClick={() => this.sendData()}>Fly Pigeon to Component2, Component3 and Component4</button>
            </div>
    )
  }
}

class Component2 extends React.Component {
  constructor(props) {
    super(props);
    release(this);

    this.state = {
      number: 1
    }
  }

  changeNumber(e){
    this.setState({number: e.count})
  }

  render(){
    return (
            <div style={{background: '#e1e1e1', padding: 20}}>
              <h1>Component2</h1>
              <p>The secret number : <label>{this.state.number}</label></p>
            </div>
    )
  }
}

class Component3 extends React.Component {
  constructor(props) {
    super(props);
    release(this);

    this.state = {
      bg: '#2984fa'
    }
  }

  componentDidMount() {
    release(this)
  }

  changeMyColor(e){
    console.log("Component3");
    this.setState({bg: e.newColor})
  }

  render(){
    return (
            <div style={{background: this.state.bg, padding: 20}}>
              <h1>Component3</h1>
              <p>My background can be change by a pigeon from Component1</p>
            </div>
    )
  }
}

class Component4 extends React.Component {
  constructor(props) {
    super(props);
    release(this);
  }

  introduceYourself(e){
    alert("I'm component 4")
  }

  anotherMethod() {
    alert("They come in order, please stop work with me!")
  }

  render() {
    return (
            <div style={{padding: 20}}>
              <h1>Component4</h1>
              <button onClick={() => pigeOn('Component2.changeNumber', {count: 2021}) }>I want to change number from Component2</button>
            </div>
    )
  }
}


const App = () => (
        <div>
          <Component1/>
          <hr/>
          <br/>
          <Component2/>
          <hr/>
          <br/>
          <Component3/>
          <hr/>
          <br/>
          <Component4/>
        </div>
);


export default App;

```

