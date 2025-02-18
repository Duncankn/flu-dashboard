import React from 'react';

const Footer = () => {
  return (
    <div>
        <p className="text-xs text-gray-600">資料來源：衛生署</p>
        <p className="text-xs text-gray-500">This dashboard is for informational purposes only and should not be considered professional advice.</p>
        <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} 香港流感監測儀表板. All rights reserved.
        </p>
    </div>
  );
};

export default Footer;
