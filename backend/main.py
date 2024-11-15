from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama
import chromadb
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize Chroma database client and load collection from disk
db = chromadb.PersistentClient(path="./chroma_db")
chroma_collection = db.get_or_create_collection("llama_index_test_collection")

# Set up ChromaVectorStore, StorageContext, and load the index
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# Define embedding model and load the index
embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
index = VectorStoreIndex.from_vector_store(vector_store, embed_model=embed_model)

# Define query engine using Ollama's instruct mode model
query_engine = index.as_query_engine(llm=Ollama(model="llama3.2:1b-instruct-fp16", request_timeout=360.0))

# Define request and response models
class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str

# Define API route for querying the LLM
@app.post("/query", response_model=QueryResponse)
async def query_llm(request: QueryRequest):
    try:
        # Use query engine to get a response for the question
        response = query_engine.query(request.question)
        print(response.response)
        return QueryResponse(answer=str(response.response))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))