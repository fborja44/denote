/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

// Component imports
import Searchbar from "../Searchbar";

export interface PageHeaderButtonProps {
  title: string;
  onClick: any;
}

const PageHeaderButton: React.FC<PageHeaderButtonProps> = ({
  title,
  onClick,
  children,
}) => {
  return (
    <li title={`${title}`}>
      <button onClick={onClick}>{children}</button>
    </li>
  );
};

export default PageHeaderButton;