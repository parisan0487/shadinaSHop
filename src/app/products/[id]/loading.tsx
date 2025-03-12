import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div id="container" className="flex flex-row-reverse">
        <div id="square" className="shimmer">
          <div className="glass-line"></div>
        </div>
        <div id="content">
          <div id="content-title" className="shimmer">
            <div className="glass-line"></div>
          </div>
          <div id="content-desc">
            <div className="line shimmer">
              <div className="glass-line"></div>
            </div>
            <div className="line shimmer">
              <div className="glass-line"></div>
            </div>
            <div className="line shimmer">
              <div className="glass-line"></div>
            </div>
            <div className="line shimmer">
              <div className="glass-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
