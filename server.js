const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const authRoutes = require("./routes/authRoutes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Register plugin JWT
  await server.register(Jwt);

  // Deklarasi strategi autentikasi
  server.auth.strategy("jwt", "jwt", {
    keys: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    verify: {
      aud: "urn:audience:test",
      iss: "urn:issuer:test",
      sub: false,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.user },
      };
    },
  });

  server.auth.default("jwt");

  // Register routes
  server.route(authRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
