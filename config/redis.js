import { createClient } from "redis";

const client = createClient({
  url: "rediss://default:AXdwAAIjcDE5Y2RhMDNkNGI3MmU0NWRhYjI3MWNiNDQzYjhjNWI0ZnAxMA@smashing-gobbler-30576.upstash.io:6379",
});

client.on("error", function (err) {
  throw err;
});

export default client;
