import React from "react";
import './index.css';

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>© {currentYear} jmu刷题平台</div>
      <div>
        <a href="https://https://github.com/kdcfff" target="_blank">
          kknd@jmu
        </a>
      </div>
    </div>
  );
}
