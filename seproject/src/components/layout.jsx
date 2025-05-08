
// src/components/Layout.jsx
const Layout = ({ children }) => {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 flex items-center justify-center px-4 py-20">
        {/* Optional animated background dots or blur effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-800/10 via-cyan-600/10 to-transparent animate-pulse-slow z-0" />
        
        {/* Main content container */}
        <div className="relative z-10 w-full max-w-5xl">
          {children}
        </div>
      </div>
    );
  };
  
  export default Layout;
  