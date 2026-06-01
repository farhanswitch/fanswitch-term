import fs from 'fs';
import path from 'path';
import ClientOrchestrator from './ClientOrchestrator';

export default function Page() {
  const contentDir = path.join(process.cwd(), 'src/content');

  const educationContent = fs.readFileSync(path.join(contentDir, 'education.md'), 'utf8');
  const projectsContent = fs.readFileSync(path.join(contentDir, 'projects.md'), 'utf8');
  const bioContent = fs.readFileSync(path.join(contentDir, 'bio.md'), 'utf8');
  const socialsContent = fs.readFileSync(path.join(contentDir, 'socials.md'), 'utf8');

  return (
    <ClientOrchestrator
      educationContent={educationContent}
      projectsContent={projectsContent}
      bioContent={bioContent}
      socialsContent={socialsContent}
    />
  );
}
