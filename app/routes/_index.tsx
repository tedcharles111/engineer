import { BaseChat } from '~/components/chat/BaseChat';

export default function Index() {
  return (
    <div className="home-page">
      <div className="container">
        <BaseChat />
        <div className="features-sidebar">
          <div className="preview-tag">
            <small>✨ Edit with Multiverse</small>
          </div>
        </div>
      </div>
    </div>
  );
}
