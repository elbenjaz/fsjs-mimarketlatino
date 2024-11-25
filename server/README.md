# Mi Market Latino 🛍️

Este proyecto es un **marketplace** desarrollado como parte del proyecto final del bootcamp Full Stack Javascript G37 de **DesafioLATAM**. La aplicación permite a los usuarios navegar por distintas categorías de productos, añadir productos a favoritos, gestionar un carrito de compras y realizar compras. También incluye una sección de perfil de usuario donde se pueden ver el historial de órdenes de compras y ventas, gestionar productos favoritos y actualizar los datos del usuario.

Este proyecto constituye el backend del marketplace, desarrollado con NodeJS y PostgreSQL, ofreciendo una API REST para el manejo de datos y operaciones del marketplace.

## Tecnologías Utilizadas 💻

- **NodeJS**: Para el servidor y la lógica de backend.
- **PostgreSQL**: Como sistema de gestión de bases de datos.
- **Express**: Framework de NodeJS para construir la API REST.

El backend está desplegado en **Render**, proporcionando una experiencia de carga de datos rápida y segura.

## Dependencias Principales 🛠️

- `bcryptjs`: Para el hashing y seguridad de las contraseñas.
- `cors`: Habilitar CORS para la API.
- `dotenv`: Gestionar variables de entorno.
- `express`: Framework para crear el servidor.
- `express-validator`: Validar los datos de las peticiones.
- `google-auth-library`: Autenticación con Google OAuth.
- `jsonwebtoken`: Manejar tokens JWT para autenticación.
- `pg`: Cliente de PostgreSQL para NodeJS.
- `swagger-jsdoc` & `swagger-ui-express`: Documentar la API con Swagger.

## Pruebas 🧪

El proyecto incluye pruebas automatizadas con `jest`. Para correr las pruebas:

- Ejecuta `npm test` para una ejecución única.
- Usa `npm run test:watch` para modo de vigilancia.

## Documentación de API 📖

La documentación de la API está disponible a través de Swagger, permitiendo una fácil navegación y prueba de los endpoints disponibles.

- **Local**: Inicia el servidor de desarrollo y navega a `/api/docs` en tu navegador.
- **Desplegado**: La versión desplegada de la documentación está disponible en [Documentación API](https://marketplace-backend-react-user-xwj0.onrender.com/api/v1/docs/).

# Equipo de Desarrollo 👨‍💻👩‍💻

Este proyecto ha sido desarrollado por:

- [![Juan Manuel Jerez](https://img.shields.io/badge/-Juan%20Manuel%20Jerez-181717?style=for-the-badge&logo=github)](https://github.com/JuanManuelJerezBaraona)
- [![Carolina Lunas](https://img.shields.io/badge/-Carolina%20Lunas-181717?style=for-the-badge&logo=github)](https://github.com/carolinalunasfarah)
- [![Valentina Muñoz](https://img.shields.io/badge/-Valentina%20Muñoz-181717?style=for-the-badge&logo=github)](https://github.com/vnasp)
- [![Benjamín Segura](https://img.shields.io/badge/-Benjamín%20Segura-181717?style=for-the-badge&logo=github)](https://github.com/elbenjaz)

## Código Fuente 📝

El proyecto consta de dos partes principales, el frontend y el backend, accesibles a través de los siguientes enlaces:

- **Frontend**: [![GitHub](https://img.shields.io/badge/-Frontend-181717?style=for-the-badge&logo=github)](https://github.com/vnasp/marketplace-frontend-react-user)
- **Backend**: [![GitHub](https://img.shields.io/badge/-Backend-181717?style=for-the-badge&logo=github)](https://github.com/vnasp/marketplace-backend-react-user)

## Despliegue 🚀

Las aplicaciones están desplegadas y accesibles públicamente a través de los siguientes enlaces:

- **Frontend**: [Visitar Sitio](https://mimarketlatino.netlify.app/)
- **Backend**: [Documentación API](https://marketplace-backend-react-user-xwj0.onrender.com/api/v1/docs/)
