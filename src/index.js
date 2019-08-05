import dva from 'dva';
import models from './models/index';
import './style/init.scss';

// 1. Initialize
const app = dva({
  history: require('history').createBrowserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
Object.keys(models).forEach((key) => {
  const model = models[key];

  if (model) {
    console.log(model)
    app.model(model);
  }
});

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
