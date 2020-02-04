import React from 'react'

const data = [
  {
    menus: [
      {
        active: true,
        icon: "dashboard",
        key: "/portal/dashboard",
        primaryText: "Dashboard"
      },
      {
        icon: "timeline",
        key: "/portal/timeline",
        primaryText: "Timeline"
      },
      {
        icon: "users",
        key: "/portal/user",
        primaryText: "Users"
      },
      {
        icon: "calls",
        key: "/portal/call",
        primaryText: "Calls"
      },
      {
        icon: "registrations",
        key: "/portal/registration",
        primaryText: "Registrations"
      },
      {
        icon: "shopping-cart",
        key: "/portal/purchase",
        primaryText: "Purchase"
      },
      {
        icon: "shops",
        key: "/portal/shop",
        primaryText: "Repair Shops"
      },
      {
        icon: "affiliate",
        key: "/portal/affiliate",
        primaryText: "Affiliates"
      },
      {
        icon: "claims",
        key: "/portal/claim",
        primaryText: "Claim Reports"
      },
      {
        icon: "device-phone",
        key: "/portal/devices",
        primaryText: "Devices"
      },
      {
        icon: "settings",
        key: "/portal/setting",
        primaryText: "Settings",
        sub: [
          {
            icon: "icon",
            key: "/portal/icon",
            primaryText: "Icons"
          },
          {
            icon: "carousel",
            key: "/portal/carousel",
            primaryText: "Carousel"
          },
          {
            icon: "manufacturer",
            key: "/portal/manufacturers",
            primaryText: "Manufacturers"
          },
          {
            icon: "survey",
            key: "/portal/survey",
            primaryText: "Registration Survey"
          },
          {
            icon: "coverage",
            key: "/portal/product-plans",
            primaryText: "Plans"
          },
          {
            icon: "company",
            key: "/portal/company",
            primaryText: "Company"
          },
          {
            icon: "administrator",
            key: "/portal/administrators",
            primaryText: "Administrators"
          },
          {
            icon: "underwriter",
            key: "/portal/underwriters",
            primaryText: "Underwriters"
          },
          {
            icon: "support",
            key: "/portal/support",
            primaryText: "Support"
          }
        ]
      }
    ],
    "name": "Admin",
    "statuses": [
        "Submitted",
        "Accepted",
        "Denied",
        "For Review",
        "In progress",
        "Paid by Liquipel",
        "Paid by Affiliate",
        "Cleared",
        "Closed",
        "Approved"
        ]
  }
];

const treeData = [
  {
    title: "Dashboard"
  },
  {
    title: "Timeline"
  },
  {
    title: "User"
  },
  {
    title: "Settings",
    expanded: true,
    children: [
      {
        title: "Icons"
      }
    ]
  }
];

const renderDepthTitle = ({ node }) => {
    return (
      <span style={{ color: node.active ? "blue" : "black" }}>
        {node.primaryText}
      </span>
    );
  };

const extractTreeData = data => {

  const newData = data.map(({ menus, name, statuses }) => {

    const newMenuData = menus.map(({ primaryText, key, icon, active, sub }) => {
      let children;

      if (sub) {
        children = sub.map(({ primaryText, key, icon }) => {

          return {
            title: primaryText,
            primaryText,
            key,
            icon
          };
        });
      }

    //   const title = <span style={{ color: active ? "blue" : "black" }}>{primaryText}</span>

      return {
        title: renderDepthTitle,
        primaryText,
        key,
        icon,
        active: Boolean(active),
        children
      };
    });

    return [ ...newMenuData ]
  });

 return newData[0]


};

const result = extractTreeData(data);

export default result;
