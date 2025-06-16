import { ProjectHeader } from '@/components/project/header';
import { ProjectTabs } from '@/components/project/tabs';

export async function generateStaticParams() {
  // Generate static params for known project IDs
  // You can modify this array to include the actual project IDs you want to pre-render
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <ProjectHeader projectId={params.id} />
      <ProjectTabs projectId={params.id} />
    </div>
  );
}