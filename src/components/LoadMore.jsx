//components
import { Button } from "react-bootstrap";

//stylesheet
import "./loadmore-styles.scss";

const LoadMore = (props) => {
  return (
    <>
      <Button id="load-more-btn" onClick={() => props.onLoadMore()}>
        Load more
      </Button>
    </>
  );
};

export default LoadMore;
