import React from 'react';

import OneProductJSON from "./customComponentList/one-product.json"
import OneProductImage from "./customComponentList/one-product.png"
import OneProductRowJSON from "./customComponentList/oneproduct-row.json"
import OneProductRowImage from "./customComponentList/oneproduct-row.png"
import ThreeProductRowJSON from "./customComponentList/three-product-col.json"
import ThreeProductColImage from "./customComponentList/three-product-col.png"
type TButtonProps = {
  label: string;
  icon: JSX.Element;
  block: () => any;
};
// TODO: Register Custom Blocks
export const CustomComponents: TButtonProps[] = [
  {
    label: 'One Product',
    icon: <img style={{width:"70px",height:"70px"}} src={OneProductImage} alt="Custom Icon" />,
    block: () => ({
      type: "CustomBlock",
      data: OneProductJSON
    }),
  },
  {
    label: 'One Product Row',
    icon: <img style={{width:"70px",height:"70px"}} src={OneProductRowImage} alt="Custom Icon" />,
    block: () => ({
      type: "CustomBlock",
      data: OneProductRowJSON
    }),
  },
  {
    label: 'Three Product Col',
    icon: <img style={{width:"70px",height:"70px"}} src={ThreeProductColImage} alt="Custom Icon" />,
    block: () => ({
      type: "CustomBlock",
      data: ThreeProductRowJSON
    }),
  },
];
