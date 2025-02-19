require('dotenv').config();
const { PORT } = require('./src/config/envs')
const app = require('./src/app');

app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
})