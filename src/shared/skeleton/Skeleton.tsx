import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={851}
    height={1024}
    viewBox="0 0 851 1024"
    backgroundColor="#e3e3e3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="11" ry="11" width="852" height="118" />
    <rect x="0" y="130" rx="11" ry="11" width="852" height="118" />
    <rect x="0" y="260" rx="11" ry="11" width="852" height="118" />
    <rect x="0" y="390" rx="11" ry="11" width="852" height="118" />
    <rect x="0" y="520" rx="11" ry="11" width="852" height="118" />
  </ContentLoader>
);

export default Skeleton;
