
[![MIT LICENSE](https://img.shields.io/github/license/0911-Mahin/Project-Recommender)](LICENSE)

# Project-match
__Projects that are relevant__  
Software developers usually have all the skills they need but aren't able to prove it to their clients. They scroll through generic project lists trying to find the right project to do but days late and not a single line of code is written. Hence, an engine that recommends projects catered to the developer’s specific skills based on semantic similarity.

[Live Demo](https://project-recommender-zeta.vercel.app)



https://github.com/user-attachments/assets/e6fdb2f6-a723-4042-ba74-e4dd295bcfda


Demo also available on [youtube](https://youtu.be/mS0XK0dSXX0)

### Features
- All-MiniLM-L6-V2 model used to generate vector embedding
- Vector embeddings of projects are pre calculated and stored in chromaDB for low latency
- Cosine similarity to calculate distance of a user’s skills from a project, avoids similarity drops due to length
- Relevance threshold set at a distance of 0.65
- Diversification by removal of recommended projects based on skill overlap of 0.9 or greater
- Model and ChromaDB loaded directly into cache for faster performance
- Auth implementation to store favorites and search history

### Tech Stack
1. ML Stack
    - Hugging Face → Sentence Transformers
    - All-MiniLM-L6-V2
    - ChromaDB
2. Backend
    - Python
    - Django
    - Django Rest Framework (DRF)
    - SQLite
    - JSON Web Token Authentication
3. Frontend
    - React js (vite)
    - Tailwind CSS

### How it works
The skills entered by a user are joined into a comma separated string and passed into a Language model (All-MiniLM-L6-V2) for generation of embeddings. The generated embeddings are compared with pre-calculated embeddings dataset stored in ChromaDB to find the distances (Distance function: cosine) of user’s skill from projects in our database. Slicing the result at a threshold of less than 0.65 (with a fallback to minimum 3 projects) for relevance and reordering projects based on skill overlap (0.9 threshold) to diversify the top most results.

### Architecture
The user is provided with a simple, user-friendly UI made in react js to input their skills. The entered skills are sent to the backend server implemented using Django Rest Framework that calculates the projects to recommend and returns the results back to react frontend where projects are displayed to the user  
  
*Diagram of data pipeline*
<img width="812" height="456" alt="Architecture drawio" src="https://github.com/user-attachments/assets/6cde9279-1107-476d-a2d9-00f7a9d61e5d" />
<br/>  
<br/>

### Prerequisites
| Component | Version |
| -------|--------| 
| Python | version 3.12.13+ |
| NodeJS |  v24.10.0+ |
| npm | 11.16.0+ |
| python3-venv (linux) | -- |
| Git (optional) | -- |

### Installation
1. Clone repository (or download zip directly from github and extract)
   ```bash
   git clone https://github.com/0911-Mahin/Project-Recommender.git
   ```
2. Navigate to project folder
   ```bash
   cd Project-Recommender
   ```
3. Install frontend modules
   ```bash
   cd React-Frontend
   npm install
   ```
4. Setup backend
   ```bash
   cd ../Django-Backend
   python -m venv env
   ```
   - On windows
       ```bash
       .\env\Scripts\activate
       pip install -r requirements_windows.txt
       ```
   - On Linux
       ```bash
       source ./env/bin/activate
       pip install -r requirements_ubuntu.txt
       ```
5. Setup Environment (Production-Only)  
   - Run to generate SECRET_KEY
      ```bash
      python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
      ```
   - Place secret key in `.env` file  
      Create a file `.env` inside `Django-Backend/Backend` folder and place your generated key in the given format
      ```env
      SECRET_KEY=generated-50-character-key
      DEBUG=False
      ALLOWED_HOSTS=comma,sperated,list,of,allowed,domain,names
      ```
7. Start Server
   ```bash
   python manage.py runserver
   # In another terminal inside React-Frontend folder
   npm run dev
   ```
8. Open the link mentioned in the running react server (http://localhost:5173)

> [!NOTE]
> if backend modules installation fails on ubuntu giving the error `Disk Quota Exceeded`. Try saving cache somewhere else
```bash
export TMPDIR=/path/to/large/tmp
mkdir -p $TMPDIR
```

### Dataset
A small dataset of 170 projects web scraped from [roadmap.sh](https://roadmap.sh/), [devprojects by codementor](https://www.codementor.io/). Originally a total of 342 projects but reduced to 170 after removal of duplicates

### Future Improvements
- Using LLM like LLAMA rather than All-MiniLM-L6-V2
- Using Hugging Face API endpoints for larger models (due to lack of computational power)
- Increasing the size dataset
- Live Deployment
