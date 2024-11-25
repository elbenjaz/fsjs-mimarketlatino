# Cómo hacer deploy en Render.com

## Base de Datos

1. Ir a render y loguear con GitHub
2. Click en +New y elegir PostgreSQL
3. De deben completar los siguientes campos:
	- Name: ingresar un nombre del proyecto (marketplace_postgresql)
	- Database: dejar en blanco para generar automático y random
	- User: dejar en blanco para generar automático y random
	- El resto en blanco y elegir el plan FREE
4. Cuando en Status dice Available es porque está listo.
5. Ingresar por terminal al External Database URL, por ejemplo: psql y la external database url
6. Buscar el schema.sql en el repositorio y comenzar a cargar las tablas en la base de datos
7. Buscar el data_example.sql en el repositorio y cargar los datos de ejemplo iniciales en la base de datos.
8. Volver a Render a la base de datos, bajar a Connections y estos datos son los que deben reemplazarse siempre en el Web Service.


## Web Service en Render.com
1. Ir a render y loguear con GitHub
2. Click en +New y elegir Web Service
3. Elegir "build and deploy from a Git repository" y buscar el repositorio de backend.
4. De deben completar los siguientes campos:
	- Name: ingresar un nombre del proyecto (marketplace_backend)
	- Root Directory: poner un punto
	- Runtine: Node
	- Build Command: npm install
	- Start Command: node server.js
	- El resto en blanco y elegir el plan FREE
	- Environment Variables: colocar las mismas seteadas en el env local
		  DB_HOST: valor de hostname en la base de datos
    	DB_NAME: valor de database en la base de datos
    	DB_USER: valor de username en la base de datos
   	  DB_PASS: valor de password en la base de datos
		  DB_PORT: valor de port en la base de datos