import { getStore } from "@netlify/blobs";

const store = getStore("scoreboard");

export default async (req) => {
  try {
    if (req.method === "GET") {
      const data = await store.get("state", { type: "json" });

      return new Response(
        JSON.stringify(data || {
          home: "CASA",
          away: "FORA",
          homeScore: 0,
          awayScore: 0,
          period: "1º TEMPO",
          minute: "00:00",
          added: "",
          competition: "CAMPEONATO",
          updatedAt: Date.now()
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    if (req.method === "POST") {
      const data = await req.json();

      await store.setJSON("state", {
        ...data,
        updatedAt: Date.now()
      });

      return new Response(
        JSON.stringify({ ok: true }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
};
export const config = {
  path: "/api/score"
};
