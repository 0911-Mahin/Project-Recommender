import chromadb
import sentence_transformers

from Recommender.models import Skill, Project

client = chromadb.PersistentClient(path="./ChromaDB")
collection = client.create_collection(name="Projects", configuration={
        "hnsw": {
            "space": "cosine",
        }
    })

model = sentence_transformers.SentenceTransformer('all-MiniLM-L6-v2')

Projects = Project.objects.all()
all_embeddings = []
all_project_ids = []
for i in range(0, len(Projects), 64):
    try:
        batch_projects = Projects[i:i+64]
    except Exception as e:
        batch_projects = Projects[i:]
    all_project_ids.extend([str(project.id) for project in batch_projects])
    all_embed_texts = []
    for project in batch_projects:
        title = project.title
        description = project.description
        difficulty = project.difficulty
        skills_required = [skill.name for skill in project.skills_required.all()]
        skill_text = ", ".join(skills_required)
        all_embed_texts.append(f"{title}. {title}. {description} Skills: {skill_text}. {skill_text}. Difficulty: {difficulty}.")
    embeddings = model.encode(all_embed_texts).tolist()
    all_embeddings.extend(embeddings)
    print("E", i, len(all_embeddings))

collection.add(
    ids=all_project_ids,
    embeddings=all_embeddings
)
