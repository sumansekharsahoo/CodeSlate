# Code Slate

Code Slate is an online code editor that allows users to write, run, and share code in multiple programming languages, leveraging Docker containers for secure and isolated code execution.

## Technolohies

- Frontend: React with Vite
- Code Editor: Monaco Editor
- Styling: Tailwind CSS
- Backend: Express.js server with Docker for code execution

## How It Works

1. **Code Writing**: Users write code in the browser-based editor, which supports multiple programming languages.

2. **Execution Request**: When a user clicks "Run", their code and any input are sent to the backend server.

3. **Docker Container Execution**:
   - The backend receives the code, input, and selected language.
   - It selects the appropriate Docker image based on the language.
   - A new Docker container is spun up, isolated from the host system.
   - The user's code and input are passed into the container.
   - The code is executed within the container's environment.

4. **Result Handling**:
   - The container captures the program's output or any error messages.
   - This output is sent back to the backend server.
   - The server forwards the results to the frontend.

5. **Display Results**: The frontend displays the execution output or error messages in the output panel.

6. **Container Cleanup**: After execution, the Docker container is automatically terminated and removed, ensuring a clean slate for each run.

This approach allows for:
- Secure execution of user-submitted code
- Language-specific environments without conflicts
- Resource limitation and isolation
- Quick startup and cleanup for each code run

