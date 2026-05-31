import fs from 'fs';
import path from 'path';
import ClientOrchestrator from './ClientOrchestrator';

export default function Page() {
  const eduPath = path.join(process.cwd(), 'src/content/education.md');
  const projPath = path.join(process.cwd(), 'src/content/projects.md');

  const educationContent = fs.readFileSync(eduPath, 'utf8');
  const projectsContent = fs.readFileSync(projPath, 'utf8');

  return (
    <ClientOrchestrator 
      educationContent={educationContent} 
      projectsContent={projectsContent} 
    />
  );
}
