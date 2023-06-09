import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const Skeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width="851px"
      height="1024px"
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
};

export default Skeleton;
