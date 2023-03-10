import React, { useEffect, useState } from 'react';
import './Admin.css';
import { authService } from '../../services/authService';
import { UpdateMenu } from '../../components/updateMenu/updateMenu';

function Admin() {
  const [userAuth, setUserAuth] = useState({});
  useEffect(() => {
    const loginFunction = async () => {
      const { token } = JSON.parse(sessionStorage.getItem('user'));
      if (token) {
        const res = await authService
          .verifyToken(token)
          .catch((e) => console.log('error:', e));
        setUserAuth(res);
      }
    };

    // loginFunction();
    return () => {};
  }, []);

  return (
    <div className="admin-page">
      <UpdateMenu />
    </div>
  );
  // return Object.keys(userAuth).length > 0 ? (
  //   <div className="admin-page">
  //     <UpdateMenu />
  //   </div>
  // ) : (
  //   <div>not found</div>
  // );
}

export default Admin;
