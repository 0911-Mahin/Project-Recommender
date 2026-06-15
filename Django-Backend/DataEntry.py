import json
import chromadb
import sentence_transformers

from Recommender.models import Skill, Project

client = chromadb.PersistentClient(path="./ChromaDB")
collection = client.create_collection(name="Projects", configuration={"hnsw": {"space": "cosine",}})

model = sentence_transformers.SentenceTransformer('all-MiniLM-L6-v2')

with open("./../Data.json", "r") as f:
    data = json.load(f)

last_embed_index = 0
all_embed_texts = []
all_embeddings = []
all_project_ids = []
for i, project_data in enumerate(data):
    title = project_data["title"]
    description = project_data["description"]
    difficulty = project_data["difficulty"]
    skills_required = project_data["skills_required"]
    project = Project.objects.create(
        title=title,
        description=description,
        difficulty=difficulty
    )
    for skill_name in skills_required:
        skill, created = Skill.objects.get_or_create(name=skill_name)
        project.skills_required.add(skill)
    all_project_ids.append(str(project.id))
    skill_text = ", ".join(skills_required)
    all_embed_texts.append(f"{title}. {title}. {description} Skills: {skill_text}. {skill_text}. Difficulty: {difficulty}.")
    print(i)
    if (i + 1) % 64 == 0 or (i + 1) == len(data):
        embed_texts = all_embed_texts[last_embed_index: (i+2) if (i+1) == len(data) else (i+1)]
        embeddings = model.encode(embed_texts).tolist()
        all_embeddings.extend(embeddings)
        print("E", last_embed_index, len(all_embeddings))
        last_embed_index = i+1

collection.add(
    ids=all_project_ids,
    embeddings=all_embeddings
)
