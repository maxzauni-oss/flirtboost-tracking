import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/track_usage", async (req, res) => {
  try {
    const body = req.body || {};
    const event = String(body.event || "");
    if (!event) return res.status(400).json({ ok: false, error: "Missing event" });

    const doc = {
      id: uuidv4(),
      event,
      user_lang: (body.user_lang || "").toString().slice(0, 8),
      source: (body.source || "gpt_store").toString().slice(0, 24),
      pro: Boolean(body.pro),
      ts: new Date().toISOString()
    };

    console.log("USAGE_EVENT", JSON.stringify(doc));
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
});

export default app;
