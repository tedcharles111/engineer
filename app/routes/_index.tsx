import { BaseChat } from '~/components/chat/BaseChat';
import { MarketingToggle } from '~/components/MarketingToggle';

export default function Index() {
  const handleAdGenerate = (adContent: any) => {
    console.log('Ad generated:', adContent);
    // Handle the generated ad content
  };

  return (
    <div className="home-page">
      <div className="container">
        <BaseChat />
        <div className="features-sidebar">
          <MarketingToggle onAdGenerate={handleAdGenerate} />
          <div className="preview-tag">
            <small>Edit with Multiverse</small>
          </div>
        </div>
      </div>
    </div>
  );
}
