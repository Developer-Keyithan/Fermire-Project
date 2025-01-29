'use client'

import { useEffect, useState, JSX } from "react";
import UserDashboard from "../../../../Components/User Dashboard Controller/UserDashboardController";
import axios from "axios";
import { useRouter } from "next/navigation";
import Delivered from "../../../../Components/Delivered/Delivered";
import Deliveries from "../../../../Components/Delivered/Delivered";
import Users from "../../../../Components/Admins/Users";
import Products from "../../../../Components/Admins/Products";
import Orders from "../../../../Components/Admins/Orders";
import Payments from "../../../../Components/Admins/Payments";
import Offers from "../../../../Components/Admins/Offers";

type UserDataType = {
  id: string;
  name: string;
  email: string;
  userType: string;
  mobileNumber: number[];
  firstName: string;
  lastName: string;
  updatedAt: string;
};

const adminDashboard = () => {
  const [UserData, setUserData] = useState<UserDataType | null>(null);
  const [activePanel, setActivePanel] = useState<string>("Delivered");

  // const panelComponents: { [key: string]: JSX.Element } = {
  //   Delivered: <Delivered />,
  //   Deliveries: <Deliveries />,
  // };


  const router = useRouter();

  useEffect(() => {
    const findUser = async () => {
      const response = await axios.get('/api/cookie');
      if (response.status === 200 && response.data.user.userType !== 'super-admin') {
        router.push('/')
      }

      if (response.status === 200 && response.data.user.userType === 'super-admin') {
        const id = response.data.user.id;
        const superAdmin = await axios.post('/api/user/get-user', {
          userId: id
        });

        setUserData(superAdmin.data.user);
      }
    }

    findUser()
  }, [])

  const panelComponents: { [key: string]: JSX.Element } = {
    Users: <Users />,
    Products: <Products />,
    Orders: <Orders />,
    Payments: <Payments />,
    Deliveries: <Deliveries />,
    Offers: <Offers />
  };

  const panels = ["Users", "Products", "Orders", "Payments", "Deliveries", "Offers"];

  const handlePanelClick = (panel: string) => {
    setActivePanel(panel);
  }

  return (
    <div className="mx-60">
      {UserData && <UserDashboard User={UserData} activePanel={activePanel} onPanelClick={handlePanelClick} panels={panels} />}
      {panelComponents[activePanel]}
    </div>
  )
}

export default adminDashboard;
