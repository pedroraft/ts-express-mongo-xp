import {App} from "./app";

const server = new App();

const port = process.env.PORT || 5000;

server.expressApp.listen(port, () => {
  console.log(`[*] server started on http://localhost:${port}`);
});
