// === Micro-react-like state engine ===
let currentComponent = null;
let hookIndex = 0;

function useState(initial) {
  const component = currentComponent;
  const i = hookIndex++;

  if (!component.hooks[i]) {
    component.hooks[i] = initial;
  }

  const setState = (newState) => {
    component.hooks[i] = newState;
    render(component.component, component.root);
  };

  return [component.hooks[i], setState];
}

function createComponent(component, root) {
  return { component, root, hooks: [] };
}

function render(component, root) {
  root.innerHTML = '';
  currentComponent = createComponent(component, root);
  hookIndex = 0;
  const result = component();
  root.appendChild(result);
}

// === Example Component ===
function App() {
  const [count, setCount] = useState(0);

  const container = document.createElement('div');
  container.className = 'container';

  const heading = document.createElement('h1');
  heading.textContent = `Count: ${count}`;
  container.appendChild(heading);

  const paragraph = document.createElement('p');
  paragraph.textContent = 'This is a React-style component built in vanilla JS.';
  container.appendChild(paragraph);

  const button = document.createElement('button');
  button.textContent = 'Increment';
  button.onclick = () => setCount(count + 1);
  container.appendChild(button);

  return container;
}

// === Mount ===
render(App, document.getElementById('root'));
