export default function handler(request, response) {
  response.status(200).json({
    body: 'Hello from Nhat Vercel Functions!',
    query: request.query,
    cookies: request.cookies,
  });
}