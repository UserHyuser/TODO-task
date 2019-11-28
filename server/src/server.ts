import config from './config';
import Express from './Express';
import MongoDB from './MongoDB';

const app = new Express().app;
const db = new MongoDB();

db.connect();

app.listen(config.get('http.port') || 8080);

// for tests
export default app;
