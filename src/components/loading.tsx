const Loading = () => {
  return <div className="loader">loading...</div>;
};

export default Loading;

interface SkeletonProps {
  width?: string;
  length?: number;
}

export const Skeleton = ({ width = "unset", length = 20 }: SkeletonProps) => {
  const skeletons = Array.from({ length }, (_, idx) => (
    <div key={idx} className="skeleton-shape"></div>
  ));
  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletons}
    </div>
  );
};
