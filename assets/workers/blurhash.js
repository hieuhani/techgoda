import { encode } from "blurhash";

addEventListener("message", (event) => {
  const { type, payload } = event.data;
  switch (type) {
    case "BLURHASH_ENCODING": {
      const blurHash = encode(
        payload.data,
        payload.width,
        payload.height,
        4,
        4
      );
      postMessage({
        type: "BLURHASH_ENCODED",
        payload: blurHash,
      });
      break;
    }
  }
});
