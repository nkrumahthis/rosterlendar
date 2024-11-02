import OpenAI from "openai";

export async function POST(req: Request) {
	console.log("POST rota");

	const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	try {
		const { base64Image, staffName } = await req.json();

		const systemPrompt = `You are a helpful schedule assistant. Your task is to:
1. Look at the rota chart image and describe briefly what you see.
2. Check if you can find a row with the name "${staffName}"
3. If found, list their shift pattern where:
   M = Morning shift (08:00-14:00)
   A/D = Afternoon shift (14:00-20:00)
   N = Night shift (20:00-08:00)
   X = Off duty
4. Respond ONLY with the SHIFT_DATA format if found
5. If you cannot find the name written "${staffName}" in the image, respond only with "NOTFOUND"

SHIFT_DATA format example:
{
    "month": "September",
    "staff_member": "${staffName}",
    "shifts": [
        {
            "date": "2024-09-01",
            "shift": "Morning",
            "start": "08:00",
            "end": "14:00"
        }
    ]
}`;

		const userPrompt = `Can you find the name written ${staffName} in this rota chart and tell me their schedule?`;

		const chatResponse = await client.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
				{
					role: "user",
					content: [
						{
							type: "text",
							text: userPrompt,
						},
						{ type: "image_url", image_url: { url: base64Image } },
					],
				},
			],
		});

		const responseContent = chatResponse.choices[0].message.content;

		if (!responseContent) {
			throw new Error("Failed to extract shifts from the AI chat");
		}

        console.log("responseContent", responseContent)

		const shiftJson = JSON.parse(responseContent);

		return Response.json({ data: shiftJson });
	} catch (error) {
		console.error(error);
		return new Response("something very bad happened", { status: 500 });
	}
}
