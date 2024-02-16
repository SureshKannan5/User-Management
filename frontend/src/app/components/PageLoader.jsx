import Spinner from "react-bootstrap/Spinner";

const PageLoader = () => {
  return (
    <div className="centerAbsolute">
      <Spinner
        size="large"
        animation="border"
        role="status"
        variant="primary"
      />
    </div>
  );
};
export default PageLoader;
