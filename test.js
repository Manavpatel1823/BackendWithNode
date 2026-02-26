const axios = require("axios");

const BASE = "http://localhost:3000";
const POST_URL = `${BASE}/submit`;
const GET_URL = (id) => `${BASE}/submission/${id}`;

const TOTAL_REQUESTS = 500;
const BATCH_SIZE = 50; // safer than sending 500 at once

function makePayload(i) {
  return {
    name: `User-${i}`,
    email: `user${i}@test.com`,
  };
}

const useAxios = async () => {
  try {
    // 1) Create array of 500 payloads
    const payloads = [];
    for (let i = 0; i < TOTAL_REQUESTS; i += 1){
        payloads.push(makePayload(i))
    }

    // 2) POST 500 requests (in batches)
    const ids = [];

    for (let i = 0; i < payloads.length; i += BATCH_SIZE) {
      const batch = payloads.slice(i, i + BATCH_SIZE);

        const promises = [];
        for (let i = 0; i < batch.length; i += 1){
            const body = batch[i];
            promises.push(axios.post(POST_URL, body));
        }
        const responses = await Promise.all(promises);

      // collect ids from your controller response: { saved: {...} }
      for (const r of responses) {
        const id = r.data?.saved?._id;
        if (id) ids.push(id);
      }

      console.log(`POST progress: ${Math.min(i + BATCH_SIZE, TOTAL_REQUESTS)}/${TOTAL_REQUESTS}`);
    }

    if (!ids.length) {
      console.log("No IDs collected. Make sure POST returns { saved: { _id: ... } }");
      process.exit(1);
    }

    const testId = ids[0];
    console.log("\ Finished POST 500 requests.");
    console.log("Test ID:", testId);

    // 3) GET first time (MongoDB expected)
    const r1 = await axios.get(GET_URL(testId));
    console.log("\nGET #1 (MongoDB expected):");
    console.log(r1.data);

    // 4) GET second time (Redis expected)
    const r2 = await axios.get(GET_URL(testId));
    console.log("\nGET #2 (Redis expected):");
    console.log(r2.data);

    console.log("\n Check:");
    console.log("- If GET #2 contains message 'This data is coming from Redis.' => Redis HIT");
  } catch (err) {
    console.error(" Error:", err.response?.data || err.message);
  }
}

useAxios();