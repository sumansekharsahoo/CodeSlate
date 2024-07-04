  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const { exec } = require('child_process');
  const fs = require('fs');
  const path = require('path');

  const app = express();
  app.use(bodyParser.json());
  app.use(cors()); 

  app.post('/api/execute', (req, res) => {
    const { code, input, language } = req.body;

    const { fileExtension, dockerImage } = getLanguageConfig(language);
    if (!fileExtension || !dockerImage) {
      return res.status(400).json({ error: 'Unsupported language' });
    }

    const fileName = `code.${fileExtension}`;
    const inputFileName = `input.txt`;

    fs.writeFileSync(fileName, code);
    fs.writeFileSync(inputFileName, input);

    const dockerCommand = `docker run --rm -v ${__dirname}:/app -w /app ${dockerImage}`;

    exec(dockerCommand, (error, stdout, stderr) => {
      fs.unlinkSync(fileName);
      fs.unlinkSync(inputFileName);

      if (error) {
        return res.json({ output: stderr });
      } else {
        return res.json({ output: stdout });
      }
    });
  });

  function getLanguageConfig(language) {
    switch (language) {
      case 'python':
        return { fileExtension: 'py', dockerImage: 'code-executor-python' };
      case 'javascript':
        return { fileExtension: 'js', dockerImage: 'code-executor-javascript' };
      case 'java':
        return { fileExtension: 'java', dockerImage: 'code-executor-java' };
      case 'cpp':
        return { fileExtension: 'cpp', dockerImage: 'code-executor-cpp' };
      default:
        return {};
    }
  }


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
