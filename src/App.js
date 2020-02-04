import React, { useState } from "react";
import SortableTree, {
  toggleExpandedForAll,
  map,
  changeNodeAtPath
} from "react-sortable-tree";
import { Button } from "semantic-ui-react";

import Properties from "./components/Properties";
import data from "./newTreeData";

const maxDepth = 10;

export default function App() {

  const [treeData, setTreeData] = useState(data);
  const [jsonData, setJsonData] = useState([]);
  console.log("TCL: App -> jsonData", jsonData)

  return (
    <div className="wrapper">
      <div className="bar-wrapper">
        <Button secondary onClick={() => toggleNodeExpansion(true)}>
          Expand all
        </Button>
        <Button secondary onClick={() => toggleNodeExpansion(false)}>
          Collapse all
        </Button>
        <Button primary onClick={() => generateJSON(treeData)}>
          Save
        </Button>
      </div>
      <div className="tree-wrapper">
        <SortableTree
          treeData={treeData}
          onChange={handleTreeOnChange}
          maxDepth={maxDepth}
          canDrag={({ node }) => !node.noDragging}
          canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
          isVirtualized
          generateNodeProps={rowInfo => ({
            buttons: [
              <Properties
                {...rowInfo}
                handlePropertyChange={handlePropertyChange}
              />,
              <Button primary onClick={() => toggleActive(rowInfo)}>
                Active
              </Button>
            ]
          })}
        />
      </div>
    </div>
  );

  function handleTreeOnChange(treeData) {
    setTreeData(treeData);
  }

  function toggleNodeExpansion(expanded) {
    setTreeData(state => {
      return toggleExpandedForAll({
        treeData: state,
        expanded
      });
    });
  }

  function handlePropertyChange({ path, node, primaryText, key, icon }) {
    setTreeData(state => {
      return changeNodeAtPath({
        treeData: state,
        newNode: () => {
          return {
            ...node,
            primaryText,
            key,
            icon
          };
        },
        path: path,
        getNodeKey: ({ treeIndex }) => treeIndex
      });
    });
  }

  function toggleActive(rowInfo) {
    setTreeData(state => {
      const resetActive = map({
        callback: ({ node }) => ({ ...node, active: false }),
        getNodeKey: ({ treeIndex }) => treeIndex,
        treeData: state
      });

      return changeNodeAtPath({
        treeData: resetActive,
        newNode: () => {
          return {
            ...rowInfo.node,
            active: true
          };
        },
        path: rowInfo.path,
        getNodeKey: ({ treeIndex }) => treeIndex
      });
    });
  }

  function generateJSON(treeData) {

    const transform = ({ title, children, active, expanded, ...node }) => {
      if (children) {
        node.sub = children.map(transform);
      }
      if (active) {
        node.active = active;
      }
      return {
        ...node
      };
    };

    return setJsonData([
      {
        menus: [...treeData.map(transform)]
      }
    ]);
  }
}
