type QuoteEmailData = {
  name: string;
  email: string;
  whatsapp?: string;
  product: string;
  length?: string;
  width?: string;
  height?: string;
  material?: string;
};

export async function sendQuoteEmail(data: QuoteEmailData) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const targetEmail = import.meta.env.QUOTE_EMAIL;

  if (!apiKey || !targetEmail) {
    console.warn('Email configuration missing. Skipping email delivery.');
    return false;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'CapasPro <quotes@your-domain.com>',
      to: [targetEmail],
      subject: 'Novo pedido de orçamento - CapasPro',
      text: `Cliente: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.whatsapp || '-'}\nProduto: ${data.product}\nDimensões: ${data.length || '-'} x ${data.width || '-'} x ${data.height || '-'}\nMaterial: ${data.material || '-'}`,
    }),
  });

  return response.ok;
}
