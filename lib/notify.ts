export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) { console.log("[notify] mock email", to, subject); return { ok: true, mock: true }; }
  const { Resend } = await import("resend"); const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from: "RunwayTwin <no-reply@runwaytwin.example>", to, subject, html }); return { ok: true };
}
