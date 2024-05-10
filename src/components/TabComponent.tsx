import classNames from "classnames";
import { useState } from "react";

export interface TabProps {
  label: string;
  children: React.ReactNode;
}
export interface TabsComponentProps {
  children: React.ReactElement<TabProps>[];
  defaultActiveTab: number;
  applyTail?: boolean;
}
export const Tab: React.FC<TabProps> = ({ label, children }) => (
  <div className="flex flex-col">
    <button className="">{label}</button>
    <div className="p-4">{children}</div>
  </div>
);
const TabsComponent = ({ children, defaultActiveTab }: TabsComponentProps) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="mb-8">
      <div className="">
        <ul className="flex bg-white border-[#EBEBEB] rounded-2xl">
          {children.map((child, index) => (
            <li key={child.props.label} className={"flex-1"}>
              <button
                className={classNames(
                  `p-2 w-full outline-0  hover:border-primary focus:outline-0  text-xs transition duration-200 ease-in ${
                    activeTab == index
                      ? "bg-primary-color text-white"
                      : "text-primary bg-transparent"
                  }`,
                  {
                    "rounded-l-3xl": index == 0,
                    "rounded-r-3xl": index == children.length - 1,
                  }
                )}
                onClick={() => handleTabClick(index)}
              >
                {child.props.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {children.map((child, index) => (
          <div
            key={child.props.label}
            className={`${activeTab === index ? "block" : "hidden"} mt-3`}
          >
            {activeTab === index && child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
