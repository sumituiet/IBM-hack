from fastapi import FastAPI
from pydantic import BaseModel

from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama

documents = SimpleDirectoryReader("dataset").load_data()
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
Settings.llm = Ollama(model="llama3.2:1b-instruct-fp16", request_timeout=360.0)

index = VectorStoreIndex.from_documents(
    documents,
)

app = FastAPI()

class Item(BaseModel):
    message: str

@app.post("/")
async def chatbot(Item: Item):
    user_input = Item.message
    query_engine = index.as_query_engine()
    response = query_engine.query(user_input)
    print(response.response)
    return {"response": response.response}