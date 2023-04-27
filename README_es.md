<h1 align="center"> Spotify Player </h1>

<p align="center">
  <span> Leer en:&nbsp; </span>
  <a href="/README.md"> 🇺🇸 Inglés </a>
  ·
  <a href="/README_es.md"> 🇲🇽 Español </a>
</p>

https://user-images.githubusercontent.com/80338911/234712575-c54f1091-fdcf-4ff1-b301-3f9263cb343e.mp4

## Introducción

Este proyecto es un front-end de Spotify que permite ver tus listas de reproducción, así como sus canciones y otros detalles. Incluye una barra de reproducción con las funciones habituales y detalles de la canción siendo reproducida.

El proyecto usa la API de Spotify para la autenticación, así como para obtener datos de las listas de reproducción, canciones e información del estado de reproducción actual. Fue creado usando tecnologías como TypeScript, React, Next.js, NextAuth.js y Tailwind CSS.

### Nota

El proyecto no incluye la funcionalidad de reproducción, solamente cambia el estado en el dispositivo activo. Quizá agregue soporte para el [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) en el futuro.

## Configuración

Debido a las limitaciones de la API de Spotify, necesitas crear tu propia "app" para obtener acceso a la API y agregar manualmente las cuentas que tendrán acceso a esta. Para mas información puedes revisar la [guía de Spotify](https://developer.spotify.com/documentation/web-api).

Una vez creada tu aplicación, necesitarás tomar el ID y secreto (que puedes encontrar en el dashboard de tu app), así como un string secreto para cifrar tus JWTs. Recomiendo que este sea un string aleatorio, pero puede ser cualquier palabra o combinación de caracteres.

Cuando tengas todo lo anterior, crea un archivo llamado `.env.local` en el directorio raíz del proyecto (donde está tu package.json) con el siguiente contenido:

    NEXTAUTH_URL=http://localhost:3000/
    NEXT_PUBLIC_CLIENT_ID={ tu client ID }
    NEXT_PUBLIC_CLIENT_SECRET={ tu client secret }
    JWT_SECRET={ tu string secreto para los JWTs }

Si vas a desplegar la aplicación, asegúrate de definir correctamente `NEXTAUTH_URL` según la URL de tu sitio, así como configurar tus Redirect URIs en el dashboard de tu app.

Después de configurar todo esto puedes correr la aplicación usando `npm run dev`.
