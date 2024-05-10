import { useUserStore } from "../../hooks/useUserStore";

export interface MenuOptions {
  userPower: 1 | 2 | 3 | 4 | 5; // 1 = SuperAdmin 2 = Medic, 3 = Supraveghetor, 4 = Ingrijitor, 5 = Pacient
  text: string;
  icon: string;
  onClickFuntion: undefined | (() => void);
}

const LeftNavigation = () => {
  const { user, logout } = useUserStore();
  const menuOptions: MenuOptions[] = [
    {
      userPower: 2,
      text: "Add Patient",
      icon: "/images/add-pacient.png",
      onClickFuntion: undefined,
    },
    {
      userPower: 2,
      text: "Add document",
      icon: "/images/add-document.png",
      onClickFuntion: undefined,
    },
    {
      userPower: 5,
      text: "Logout",
      icon: "/images/logout.png",
      onClickFuntion: () => {
        logout();
      },
    },
  ];

  return (
    <div className="left-menu">
      <div className="hospital-logo"></div>
      <div className="navigation">
        {menuOptions.map(
          (option) =>
            user &&
            user.userPower <= option.userPower && (
              <div onClick={option.onClickFuntion} key={option.text}>
                <img src={option.icon} alt={option.text} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default LeftNavigation;
