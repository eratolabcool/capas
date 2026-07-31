import { sendQuoteEmail } from '../../lib/email';

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
    return new Response(JSON.stringify({ success: false, error: `Campos obrigatórios: ${missing.join(', ')}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await sendQuoteEmail(data as Required<Pick<QuoteRequest, 'name' | 'email' | 'product'>> & QuoteRequest);

  return new Response(JSON.stringify({
    success: true,
    message: 'Pedido recebido. Entraremos em contacto brevemente.',
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
