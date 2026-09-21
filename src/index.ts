import { serve } from "bun";
import index from "./index.html";
import { MOCK_PRODUCTS } from "./mock/productsData";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET() {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT() {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/products": {
      async GET(req) {
        const url = new URL(req.url);
        const delayStr = url.searchParams.get("delay");
        const delay = delayStr ? parseInt(delayStr, 10) : 400; // default 400ms delay for realism

        if (delay > 0) {
          await Bun.sleep(delay);
        }

        return Response.json(MOCK_PRODUCTS);
      },
    },

    "/api/products/:id": async (req) => {
      const id = parseInt(req.params.id, 10);
      const product = MOCK_PRODUCTS.find((p) => p.id === id);

      if (!product) {
        return new Response(
          JSON.stringify({ message: "Không tìm thấy sản phẩm" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return Response.json(product);
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);
