import PropTypes from "prop-types";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      {/* <Button color="green" text={<AddIcon />} onClick={onClick} /> */}
      {showAdd ? (
        <CloseIcon
          style={{ color: "red", cursor: "pointer" }}
          onClick={onAdd}
        />
      ) : (
        <AddCircleIcon
          style={{ color: "green", cursor: "pointer" }}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Crypto Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
const headingStyle = {
  color: "red",
  backgroundColor: "black",
};

export default Header;
