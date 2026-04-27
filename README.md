# phishinsight
PhishInsight - Plataforma de análisis de phishing basada en SOA

# Backend
El backend se ejecuta de forma local
host: http://127.0.0.1:8000

# Instalación inicial Backend
1. Instalar Python https://www.python.org/downloads/
2. Entrar a la carpeta: cd ../Backend
3. Crear un entorno de desarrollo en Python: python -m venv venv
4. Activar el entorno: venv\Scripts\activate
5. Instalar todas las dependencias: pip install -r requirements.txt
6. Levantar el servidor: uvicorn app.main:app --reload

# Documentación de la API (Swagger)
http://127.0.0.1:8000/docs

# Ejecucion 
1. Activar el entorno: venv\Scripts\activate
2. Levantar el servidor: uvicorn app.main:app --reload
3. Desactivar el entorno: deactivate

# Frontend
El frontend se ejecuta de forma local
host: http://localhost:5173/

# Instalación inicial Frontend
1. Instalar Node.js: https://nodejs.org/en/download/current
2. Entrar a la carpeta: cd ../Frontend/
3. Instalar dependencias: npm install
4. Crear archivo .env: VITE_API_URL=http://127.0.0.1:8000 VITE_API_KEY=tu_api_key
5. npm run dev