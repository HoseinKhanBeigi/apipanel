import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the form data from the request
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    // console.log("Parsed data:", data); // Log the parsed data

    // Redirect to the kyc page with data in the query string
    // https://levant.apipanel.levants.io/
    // https://apipanel.uat.kian.digital
    return NextResponse.redirect(
      `https://apipanel.uat.kian.digital/kyc?data=${encodeURIComponent(
        JSON.stringify(data)
      )}`
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process the request", details: error.message },
      { status: 500 }
    );
  }
}
