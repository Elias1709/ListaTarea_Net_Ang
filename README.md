# ListaTarea_Net_Ang

# Proyecto TodoList

## Tecnologías utilizadas
- **Backend (.NET 8 / C#)**  
  - ASP.NET Core Web API  
  - Entity Framework Core  
  - SQL Server  
  - Visual Studio / Visual Studio Code  

- **Frontend (Angular)**  
  - Angular CLI  
  - TypeScript  
  - HTML5 / CSS3  
  - Node.js y npm  

- **Control de versiones**  
  - Git y GitHub  

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/Elias1709/ListaTarea_Net_Ang.git
cd ListaTarea_Net_Ang
2. Backend (.NET)
Abrir la carpeta TodoListBackend en Visual Studio.

Configurar la cadena de conexión a SQL Server en appsettings.json.

Ejecutar las migraciones desde la Consola del Administrador de Paquetes:

update-database

Iniciar el servidor:
bash
dotnet run
El backend quedará disponible en https://localhost:5001.

3. Frontend (Angular)
Abrir la carpeta TodoListFrontend.

Instalar dependencias:

bash
npm install
Ejecutar la aplicación:

bash
ng serve
El frontend quedará disponible en http://localhost:4200.

##                      NOTA
## Se agrega SCRIPTBD.txt quien tiene el script de la bd utilizada 
## para este desarrollo junto con registros de prueba