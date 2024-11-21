import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = JSON.stringify({
      submission: {
        form_id: 569822,
        team_id: 111,
        responses: {
          "Name of owner": body.owner1,
          "Name of owner 2": body.owner2,
          "Name of owner 3": body.owner3,
          email: body.email,
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
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API request:", error);
    return NextResponse.json({ error: "An error occurred while submitting the form." }, { status: 500 });
  }
}
