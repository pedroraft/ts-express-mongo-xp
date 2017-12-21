import {App} from "./app";

const server = new App();

const port = process.env.PORT || 5000;

server.expressApp.listen(port, () => console.log(`Server started on http://localhost:${port}`));
