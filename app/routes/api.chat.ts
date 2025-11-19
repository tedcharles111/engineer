import { json } from '@remix-run/node';
import { MultiverseAIService } from '~/lib/llm/mistralService';

export async function action({ request }: { request: Request }) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const { messages, model } = await request.json();

  try {
    const aiService = new MultiverseAIService();
    const stream = new ReadableStream({
      async start(controller) {
        await aiService.generateStream(
          messages,
          model,
          (chunk) => {
            controller.enqueue(`data: ${JSON.stringify({ chunk })}\n\n`);
          }
        );
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return json({ error: 'Generation failed' }, { status: 500 });
  }
}
