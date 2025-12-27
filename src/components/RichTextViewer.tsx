type RichTextViewerProps = {
  html: string;
};

const RichTextViewer: React.FC<RichTextViewerProps> = ({ html }) => {
  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichTextViewer;