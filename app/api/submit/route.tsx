import axios from "axios";

export async function POST(req) {
  try {
    const { owner1, owner2, owner3, email } = await req.json();

    const data = JSON.stringify({
      submission: {
        form_id: 569822,
        team_id: 111,
        responses: {
          "Name of owner": owner1,
          "Name of owner 2": owner2,
          "Name of owner 3": owner3,
          email: email,
        },
      },
      email_name: "email",
      referrer: "https://example.com",
      utm_params: {
        utm_source: "google",
        utm_medium: "cpc",
        utm_campaign: "campaign123",
        utm_content: "content123",
        utm_term: "term123",
      },
      submission_url: "https://example.com/form",
      landing_url: "https://example.com",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://nucleus.default.com/import/submit",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Error making external API request:", error.message);
    return new Response(JSON.stringify({ error: "Failed to submit data." }), { status: 500 });
  }
}
