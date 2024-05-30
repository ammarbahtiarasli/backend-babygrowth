require("dotenv").config(); // Memuat variabel lingkungan dari .env file
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
    keys: process.env.JWT_SECRET, // Menggunakan kunci rahasia dari variabel lingkungan
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

  // Contoh route yang dilindungi
  server.route({
    method: "GET",
    path: "/protected-endpoint",
    options: {
      auth: "jwt",
    },
    handler: (request, h) => {
      return { message: "You have access to this protected endpoint!" };
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
