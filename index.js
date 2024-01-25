import fs from 'fs-extra'
import inquirer from 'inquirer'

async function copyTemplate() {
  // Ask for repository name and file types
  const answers = await inquirer.prompt([{
      type: 'input',
      name: 'repositoryName',
      message: 'Enter the repository name:',
    },
    {
      type: 'checkbox',
      name: 'fileTypes',
      message: 'Select the file types required:',
      choices: ['html', 'css', 'js', 'gitignore'],
    },
  ]);

  const { repositoryName, fileTypes } = answers;

  try {
    // Copy files from the template directory to the current repository
    await fs.copy('./template', `./${repositoryName}`);

    // Optionally, filter and keep only selected file types
    if(fileTypes.length > 0) {
      const files = await fs.readdir(`./${repositoryName}`);
      const filteredFiles = files.filter(file => fileTypes.includes(file.split('.')
        .pop()));
      await Promise.all(filteredFiles.map(file => fs.remove(`./${repositoryName}/${file}`)));
    }

    console.log('Boilerplate created successfully!');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

// Run the script
copyTemplate();
