import { fail, warn, message, markdown, danger } from "danger"

fail("This is a failure message")
warn("This is a warning")
message("This is a normal message")
markdown("*Markdown* is also **supported**")

const { additions = 0, deletions = 0 } = danger.github.pr

message(`:tada: The PR added ${additions} and removed ${deletions} lines.`)

// Function to simulate change coupling
function showChangeCoupling(modifiedFile) {
  // Define change coupling associations (example data)
  const changeCouplingMap = {
    'src/app/hero.ts': ['tsconfig.json', 'tsconfig.spec.json'],
    'app.js': ['app-helper.js', 'app-service.js'],
    // Add more associations as needed
  };
  // Get associated files for the modified file
  const associatedFiles = changeCouplingMap[modifiedFile] || [];

  // Create a collapsible Markdown section
  let collapsibleSection = '';
  if (associatedFiles.length > 0) {
    collapsibleSection += `<details><summary>Associated Files</summary>\n\n`;
    associatedFiles.forEach((file) => {
      collapsibleSection += `- ${file}\n`;
    });
    collapsibleSection += `</details>`;
  } else {
    collapsibleSection += `_No associated files found._`;
  }

  return collapsibleSection;
}

// Analyze modified files in the pull request
const modifiedFiles = danger.git.modified_files;

let message = '';
message += '### Change Coupling Analysis\n\n';

if (modifiedFiles.length > 0) {
  modifiedFiles.forEach((file) => {
    message += `- **${file}**\n`;
    message += showChangeCoupling(file);
    message += `\n\n`; // Add some spacing between files
  });
} else {
  message += '_No modified files found._';
}
