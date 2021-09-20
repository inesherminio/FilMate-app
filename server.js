const app = require("./app");
const { createServer } = require("http");
const { withSocketIO } = require("./middlewares/socket.config");

const httpServer = createServer(app);
withSocketIO(httpServer);

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
