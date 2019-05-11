require('./styles.js');

const App = require('./App');

const root = document.getElementById("root");
const app = new App(root);
app.run();