"""Simple RAG helper — stores text chunks with embeddings, retrieves top-k."""
from .embeddings import get_embedding, cosine_similarity

class SimpleRAG:
    def __init__(self):
        self.store: list[dict] = []  # [{text, embedding}]

    def add(self, text: str):
        emb = get_embedding(text)
        self.store.append({"text": text, "embedding": emb})

    def query(self, question: str, top_k: int = 3) -> list[str]:
        if not self.store:
            return []
        q_emb = get_embedding(question)
        ranked = sorted(
            self.store,
            key=lambda d: cosine_similarity(q_emb, d["embedding"]),
            reverse=True,
        )
        return [r["text"] for r in ranked[:top_k]]

# Global instance — populate at startup with course/job data if needed
rag_store = SimpleRAG()
