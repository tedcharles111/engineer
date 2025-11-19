import { useState } from 'react';

interface MarketingToggleProps {
  onAdGenerate: (projectData: any) => void;
}

export function MarketingToggle({ onAdGenerate }: MarketingToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = async (enabled: boolean) => {
    setIsEnabled(enabled);
    
    if (enabled) {
      // Generate advert for Meta
      const adContent = await generateAdContent();
      await sendToMeta(adContent);
      onAdGenerate(adContent);
    }
  };

  const generateAdContent = async () => {
    // Use AI to generate marketing content
    return {
      headline: "Amazing Web App Built with Multiverse",
      description: "Check out this incredible web application created using AI-powered Multiverse builder",
      targetAudience: "developers, entrepreneurs",
      platforms: ["facebook", "twitter", "linkedin"]
    };
  };

  const sendToMeta = async (adContent: any) => {
    // Integration with Meta Marketing API
    console.log('Sending to Meta:', adContent);
  };

  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this amazing web app I built with Multiverse!";
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  return (
    <div className="marketing-toggle">
      <label className="toggle-label">
        <span>Enable Marketing</span>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={(e) => handleToggle(e.target.checked)}
          className="toggle-switch"
        />
      </label>

      {isEnabled && (
        <div className="social-share">
          <p>Share your creation:</p>
          <div className="share-buttons">
            <button onClick={() => shareToSocial('twitter')}>Twitter</button>
            <button onClick={() => shareToSocial('linkedin')}>LinkedIn</button>
            <button onClick={() => shareToSocial('facebook')}>Facebook</button>
          </div>
        </div>
      )}
    </div>
  );
}
