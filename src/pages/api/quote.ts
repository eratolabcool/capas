export const prerender = false;

export async function POST({ request }: { request: Request }) {
  const data = await request.json().catch(() => null);

  if (!data) {
    return new Response(JSON.stringify({ success: false, error: 'Dados inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Pedido recebido. Entraremos em contacto brevemente.',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
