export const prerender = false;

type QuoteRequest = {
  name?: string;
  email?: string;
  whatsapp?: string;
  product?: string;
  length?: string;
  width?: string;
  height?: string;
  material?: string;
};

export async function POST({ request }: { request: Request }) {
  const data = (await request.json().catch(() => null)) as QuoteRequest | null;

  if (!data) {
    return new Response(JSON.stringify({ success: false, error: 'Dados inválidos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const required = ['name', 'email', 'product'];
  const missing = required.filter((field) => !data[field as keyof QuoteRequest]);

  if (missing.length) {
    return new Response(
      JSON.stringify({
        success: false,
        error: `Campos obrigatórios: ${missing.join(', ')}`,
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Production integration point:
  // Connect RESEND_API_KEY to send the Portuguese quotation email.
  // Store CRM/webhook data here after validation.
  console.log('Novo pedido CapasPro:', JSON.stringify(data));

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
