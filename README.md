# phishinsight
PhishInsight - Plataforma de análisis de phishing basada en SOA
Ejecuta el backend de forma local
host: http://127.0.0.1:8000

# Instalación inicial
1. Instalar Python https://www.python.org/downloads/
2. Crear un entorno de desarrollo en Python: python -m venv venv
3. Activar el entorno: venv\Scripts\activate
4. Instalar todas las dependencias: pip install -r requirements.txt
5. Levantar el servidor: uvicorn app.main:app --reload

# Documentación de la API (Swagger)
http://127.0.0.1:8000/docs

# Ejecucion 
1. Activar el entorno: venv\Scripts\activate
2. Levantar el servidor: uvicorn app.main:app --reload
3. Desactivar el entorno: deactivate