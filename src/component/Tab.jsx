import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children }) => {
  return (
    <div
      className="
        flex flex-col sm:flex-row flex-wrap w-full
        rounded-md bg-blue-100 text-blue-900
        justify-between gap-2 sm:gap-4 mb-6
      "
    >
      {children}
    </div>
  );
};


export const TabsTrigger = ({ children, value, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`flex-1 min-w-[120px] text-center px-4 py-3 rounded-md
        transition-colors duration-300 text-sm sm:text-base
        ${isActive ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-900 hover:bg-white hover:text-black"}
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
};


export const TabsContent = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? (
    <div className="rounded-lg border border-slate-50 bg-white shadow-md p-6 mt-8 animate-fade-in">
      {children}
    </div>
  ) : null;
};
