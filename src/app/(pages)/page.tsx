import FeedbackBox from '@/components/notices/FeedbackBox';
import InspectionPage from '@/components/vc-inspection/InspectionPage';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center gap-32 p-24">
      <InspectionPage className="" />
      <FeedbackBox />
    </main>
  );
}
