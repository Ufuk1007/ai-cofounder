import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import { Document } from '@langchain/core/documents';

export class DocumentStore {
  private client: ChromaClient;
  private embedding: OpenAIEmbeddingFunction;
  private collection: any;

  constructor(apiKey: string, agentId: string) {
    this.client = new ChromaClient();
    this.embedding = new OpenAIEmbeddingFunction(apiKey);
    this.initCollection(agentId);
  }

  private async initCollection(agentId: string) {
    this.collection = await this.client.getOrCreateCollection({
      name: `agent-${agentId}`,
      embeddingFunction: this.embedding
    });
  }

  async addDocument(document: Document) {
    await this.collection.add({
      ids: [crypto.randomUUID()],
      documents: [document.pageContent],
      metadatas: [document.metadata]
    });
  }

  async search(query: string, limit: number = 5) {
    const results = await this.collection.query({
      queryTexts: [query],
      nResults: limit
    });

    return results.documents[0].map((doc: string, index: number) => ({
      pageContent: doc,
      metadata: results.metadatas[0][index]
    }));
  }
}