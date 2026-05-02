import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const CreateFlag = () => {
  return (
    <>
      <Link to="/create-new-feature-flag">
        <Button>+ Create flag</Button>
      </Link>
    </>
  );
};
